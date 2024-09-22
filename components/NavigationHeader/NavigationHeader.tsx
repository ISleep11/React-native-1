import { Platform, StatusBar, View } from "react-native";
import ThemeSwitch from "../ThemeToggle/ThemeToggle";
import { useContext } from "react";
import { themeContext } from "../../context/ThemeContext/ThemeContext";
import { INavigationHeader } from "../../types/types";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import NetworkStatus from "../NetworkStatus/NetworkStatus";

export default function NavigationHeader({ title }: INavigationHeader) {
  const themeData = useContext(themeContext);
  const height = StatusBar.currentHeight ? StatusBar.currentHeight + 60 : 60;
  const paddingTop = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

  const progress = useDerivedValue(() => {
    return themeData.theme.currentTheme === "dark"
      ? withTiming(0, { duration: 500 })
      : withTiming(1, { duration: 500 });
  }, [themeData.theme]);

  const rHeaderBackground = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#29141c", "#f8d1ff"]
    );

    return { backgroundColor };
  });

  const rTextColor = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], ["white", "black"]);

    return { color };
  });

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: Platform.OS === "android" ? height : height + 50,
          alignItems: Platform.OS === "ios" ? "flex-end" : "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor:
            themeData.theme.currentTheme === "dark" ? "#29141c" : "#f8d1ff",
          paddingTop,
          paddingBottom: Platform.OS === "ios" ? 20 : 0,
        },
        rHeaderBackground,
      ]}
    >
      <StatusBar
        barStyle={
          themeData.theme.currentTheme === "dark"
            ? "light-content"
            : "dark-content"
        }
      />
      <Animated.Text
        style={[
          {
            color: themeData.theme.currentTheme === "dark" ? "white" : "black",
            fontSize: 20,
            fontWeight: "700",
            marginLeft: 20,
          },
          rTextColor,
        ]}
      >
        {title}
      </Animated.Text>
      <View style={{ flexDirection: "row", marginRight: 20 }}>
        <NetworkStatus />
        <ThemeSwitch />
      </View>
    </Animated.View>
  );
}
