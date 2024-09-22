import { Pressable, Text } from "react-native";
import { IButtonProps } from "../../types/types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function Button({
  text,
  onClick,
  buttonStyle,
  textStyle,
  buttonColor,
}: IButtonProps) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        pressed.value === 1 ? buttonColor.main : buttonColor.onPress,
        {
          duration: 300,
        }
      ),
    };
  });

  return (
    <Pressable
      onPress={onClick}
      onPressIn={() => (pressed.value = 1)}
      onPressOut={() => (pressed.value = 0)}
    >
      <Animated.View style={[buttonStyle, animatedStyle]}>
        <Text style={textStyle}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
}
