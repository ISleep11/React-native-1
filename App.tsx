import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import Navigator from "./navigation/Navigator/Navigator";
import Permission from "./components/Permission/Permission";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Provider } from "react-redux";
import store from "./stores/reduxSaga/store";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [biometricType, setBiometricType] = useState<
    "Touch ID" | "Face ID" | null
  >(null);

  useEffect(() => {
    async function checkBiometrics() {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      if (compatible) {
        const supportedTypes =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT
          )
        ) {
          setBiometricType("Touch ID");
        } else if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
          )
        ) {
          setBiometricType("Face ID");
        }
      }
    }
    checkBiometrics();
  }, []);

  async function onAuthenticate() {
    setIsAuthenticated(true);
    try {
      const { status: geoStatus } =
        await Location.requestForegroundPermissionsAsync();
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate with ${biometricType || "biometrics"}`,
        fallbackLabel: "Enter Password",
      });

      if (auth.success && geoStatus === "granted") {
        setIsAuthenticated(true);
      } else {
        if (!auth.success) {
          Alert.alert(
            "Authentication failed",
            "Unable to authenticate. Please try again."
          );
        } else {
          Alert.alert(
            "Authentication failed",
            "Unable to authenticate. Please enable geodata."
          );
        }
      }
    } catch (error) {
      const err = error as Error; // Type assertion

      if (
        err.message.includes("USER_DISMISS") ||
        err.message.includes("SYSTEM_CANCELED")
      ) {
        Alert.alert(
          "Authentication canceled",
          "You canceled the authentication."
        );
      } else if (err.message.includes("NOT_ENROLLED")) {
        Alert.alert(
          "Biometrics not enrolled",
          `No biometric authentication is enrolled. Please set up ${biometricType} in your device settings.`
        );
      } else if (err.message.includes("LOCKOUT")) {
        Alert.alert(
          "Biometrics locked",
          "Biometric authentication is locked. Use your device passcode."
        );
      } else {
        Alert.alert(
          "Authentication error",
          "Please enable Face ID or Touch ID in your settings."
        );
      }
    }
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <StatusBar style="light" />
        {isAuthenticated ? (
          <Navigator />
        ) : (
          <Permission
            title="You have to authenticate"
            buttonText="Authenticate"
            onClick={onAuthenticate}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonText}
            titleStyle={styles.title}
            buttonColor={{ main: "#426570", onPress: "#536b73" }}
          />
        )}
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 240,
    height: 90,
    marginTop: 25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "#cccccc",
  },
  title: {
    fontSize: 45,
    color: "#cccccc",
  },
});
