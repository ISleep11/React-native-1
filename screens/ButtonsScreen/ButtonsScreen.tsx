import {
  Platform,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import BackgroundGradient from "../../components/BackgroundGradient/BackgroundGradient";
import { IN_PROGRESS } from "@env";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Button from "../../components/Button/Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useContext, useEffect, useState } from "react";
import IconButton from "../../components/IconButton/IconButton";
import CloseIcon from "../../assets/icons/IconSVG/Close.svg";
import { themeContext } from "../../context/ThemeContext/ThemeContext";
import { RootState } from "../../stores/reduxSaga/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../../stores/reduxSaga/slice";
import * as Device from "expo-device";
import * as Location from "expo-location";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { observer } from "mobx-react-lite";
import { counter } from "../../stores/mobx-lite/CounterStore";

export default observer(function BossesScreen() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);
  const data = useSelector((state: RootState) => state.data);
  const error = useSelector((state: RootState) => state.error);
  const bottomSheetRef = useRef<null | BottomSheet>(null);
  const snapPoints = ["9%", "27%"];
  const themeData = useContext(themeContext);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0); // Открыть на первом snap point (25%)
  };

  function showFlashMessage() {
    showMessage({
      message: "When Aquaman drowns'",
      description: "I promise..",
      backgroundColor: "#804a4a",
      style: { alignItems: "center", justifyContent: "center", minHeight: 10 },
      textStyle: {
        fontSize: 15,
      },
      titleStyle: {
        fontSize: 15,
      },
      floating: true,
    });
  }

  const progress = useDerivedValue(() => {
    return themeData.theme.currentTheme === "dark"
      ? withTiming(0, { duration: 500 })
      : withTiming(1, { duration: 500 });
  });

  const rProgressTextColor = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], ["white", "black"]);

    return { color };
  });

  useEffect(() => {
    const fetchLocation = async () => {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCoords({ latitude, longitude });
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  return (
    <>
      <BackgroundGradient
        colorsInput={{
          dark: ["#673147", "#29141c"],
          light: ["#f08aff", "#f8d1ff"],
        }}
      />
      <View style={styles.mainContainer}>
        <Animated.Text
          style={[
            {
              ...styles.inProgress,
              color:
                themeData.theme.currentTheme === "dark" ? "white" : "black",
            },
            rProgressTextColor,
          ]}
        >
          {IN_PROGRESS}
        </Animated.Text>
        <Button
          text="1. When will be the project finished?"
          onClick={showFlashMessage}
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          buttonColor={{ main: "#ffffff", onPress: "#804a4a" }}
        />
        <Button
          text="2. When will be the project finished?"
          onClick={openBottomSheet}
          textStyle={styles.buttonText}
          buttonStyle={{ ...styles.button, marginTop: 20 }}
          buttonColor={{ main: "#735555", onPress: "#804a4a" }}
        />
        <Button
          text="Increase the number in the another screen (mobx-lite)"
          onClick={() => {
            counter.increment();
          }}
          textStyle={{ ...styles.buttonText, fontSize: 14 }}
          buttonStyle={{ ...styles.button, marginTop: 20 }}
          buttonColor={{ main: "#735555", onPress: "#804a4a" }}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
        {data && (
          <Text style={{ color: "grey", marginTop: 20 }}>
            Data: {JSON.stringify(data)}
          </Text>
        )}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        handleStyle={styles.handle}
      >
        <BottomSheetView style={styles.bottomSheetView}>
          <Text style={styles.bottomSheetText}>
            When the Human Torch starts swimmin
          </Text>
          <Text
            style={styles.bottomSheetSmallText}
          >{`You have an ${Device.deviceName} ${Device.deviceYearClass}, right?`}</Text>
          <Text
            style={styles.bottomSheetSmallText}
          >{`Now here are your coordinates: `}</Text>
          <Text
            style={styles.bottomSheetSmallText}
          >{`${coords.latitude} ${coords.longitude}`}</Text>
          <IconButton
            icon={CloseIcon}
            buttonStyle={styles.closeButton}
            onClick={() => bottomSheetRef.current?.close()}
            iconWidth={45}
            iconHeight={45}
          />
        </BottomSheetView>
      </BottomSheet>
      <FlashMessage position="top" />
    </>
  );
});

const styles = StyleSheet.create({
  mainContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  inProgress: { fontSize: 50, marginBottom: 20 },
  button: {
    width: 150,
    height: 75,
    borderWidth: 1,
    borderColor: "#804a4a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 15 },
  bottomSheetView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#804a4a",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 15 : 7,
  },
  closeButton: {
    paddingBottom: 70,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetText: {
    color: "white",
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "600",
  },
  handle: {
    backgroundColor: "#b56767",
  },
  bottomSheetSmallText: {
    color: "white",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "400",
  },
});
