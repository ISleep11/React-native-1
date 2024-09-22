import React, { useEffect, useState, useContext } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import SunIcon from "../../assets/icons/IconSVG/Sun.svg";
import MoonIcon from "../../assets/icons/IconSVG/Moon.svg";
import { themeContext } from "../../context/ThemeContext/ThemeContext";

export default function ThemeSwitch() {
  const themeData = useContext(themeContext);

  const [animationValue] = useState(
    new Animated.Value(themeData.theme.switchPosition)
  );

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: themeData.theme.switchPosition,
      duration: 300,
      useNativeDriver: false,
    }).start(() => themeData.finishAnimation());
  }, [themeData.theme.switchPosition]);

  useEffect(() => {
    // console.log("Тема обновлена:", themeData.theme);
  }, [themeData.theme]);

  const toggleSwitch = () => {
    themeData.toggleTheme();
  };

  const switchTranslate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18],
  });

  const backgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFA500", "#333"],
  });

  return (
    <Pressable onPress={toggleSwitch} style={styles.container}>
      <Animated.View style={[styles.background, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX: switchTranslate }],
            },
          ]}
        >
          {themeData.theme.currentIcon === "moon" ? <MoonIcon /> : <SunIcon />}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: "center",
    padding: 5,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
