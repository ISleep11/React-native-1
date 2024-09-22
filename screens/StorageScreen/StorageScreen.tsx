import { View, TextInput, Platform, StyleSheet, Keyboard } from "react-native";
import BackgroundGradient from "../../components/BackgroundGradient/BackgroundGradient";
import { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button/Button";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { themeContext } from "../../context/ThemeContext/ThemeContext";

export default function TestScreen() {
  const themeData = useContext(themeContext);

  const [asyncStorage, setAsyncStorage] = useState("");
  const [secureStore, setSecureStore] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [key, setKey] = useState(0);

  async function setItemInStorage(input: string) {
    try {
      // Encrypted Storage
      await SecureStore.setItemAsync(key.toString(), input);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }

    try {
      // Async Storage
      await AsyncStorage.setItem(key.toString(), input);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  }

  async function getItemFromStorage(input: string) {
    try {
      // Encrypted Storage
      const encryptedItem =
        (await SecureStore.getItemAsync(key.toString())) || "";
      setSecureStore(encryptedItem);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }

    try {
      // Async Storage
      const asyncItem = (await AsyncStorage.getItem(key.toString())) || "";
      setAsyncStorage(asyncItem);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  }

  const progress = useDerivedValue(() => {
    return themeData.theme.currentTheme === "dark"
      ? withTiming(0)
      : withTiming(1);
  });

  const rTextColor = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], ["white", "black"]);
    return { color };
  });

  return (
    <>
      <BackgroundGradient
        colorsInput={{
          dark: ["#673147", "#29141c"],
          light: ["#f08aff", "#f8d1ff"],
        }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.text, rTextColor]}>
            Async Storage: {asyncStorage ? asyncStorage : ""}
          </Animated.Text>
          <Animated.Text style={[styles.text, rTextColor]}>
            Secure Store: {secureStore ? secureStore : ""}
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={(value) => setInputValue(value)}
          />

          <Button
            text="Submit"
            textStyle={styles.buttonText}
            buttonStyle={styles.button}
            onClick={() => {
              if (inputValue) {
                Keyboard.dismiss();
                setItemInStorage(inputValue);
                getItemFromStorage(inputValue);
                setInputValue("");
                setKey((prev) => prev + 1);
              }
            }}
            buttonColor={{ main: "#00bfff", onPress: "#4dd2ff" }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "65%",
    height: 45,
    backgroundColor: "grey",
    borderRadius: 25,
    paddingLeft: 10,
    fontSize: Platform.OS === "ios" ? 30 : 25,
    color: "white",
    cursor: "pointer",
    marginRight: "5%",
  },
  button: {
    width: 60,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 15,
    color: "white",
  },
  inputContainer: {
    width: "100%",
    height: "50%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 40,
    paddingBottom: 20,
  },
});
