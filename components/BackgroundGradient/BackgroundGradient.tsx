import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { IGradient } from "../../types/types";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { themeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext, useEffect } from "react";

export default function BackgroundGradient({ colorsInput }: IGradient) {
  const themeData = useContext(themeContext);
  const { width, height } = useWindowDimensions();
  const aspectRatio = width / height;
  const color1 = useSharedValue(colorsInput.dark[0]);
  const color2 = useSharedValue(colorsInput.dark[1]);

  const colors = useDerivedValue(() => {
    return [color2.value, color1.value];
  }, []);

  useEffect(() => {
    if (themeData.theme.currentTheme === "light") {
      color1.value = withTiming(colorsInput.light[0], { duration: 500 });
      color2.value = withTiming(colorsInput.light[1], { duration: 500 });
    } else {
      color1.value = withTiming(colorsInput.dark[0], { duration: 500 });
      color2.value = withTiming(colorsInput.dark[1], { duration: 500 });
    }
  }, [themeData.theme]);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect
        x={0}
        y={0}
        width={width}
        height={aspectRatio < 1 ? height * 1.2 : height * 2}
      >
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, aspectRatio < 1 ? height * 1.2 : height * 2)}
          colors={colors}
        />
      </Rect>
    </Canvas>
  );
}
