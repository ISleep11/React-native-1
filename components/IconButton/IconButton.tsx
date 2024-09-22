import React from "react";
import { Pressable, View } from "react-native";
import { IconButtonProps } from "../../types/types";

export default function IconButton({
  icon: Icon,
  buttonStyle,
  onClick,
  iconWidth,
  iconHeight,
}: IconButtonProps) {
  return (
    <Pressable onPress={onClick}>
      <View style={buttonStyle}>
        <Icon
          width={iconWidth ? iconHeight : 35}
          height={iconHeight ? iconHeight : 35}
        />
      </View>
    </Pressable>
  );
}
