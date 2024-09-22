import { View, Text, StyleSheet } from "react-native";
import BackgroundGradient from "../BackgroundGradient/BackgroundGradient";
import Button from "../Button/Button";
import { IPermissionProps } from "../../types/types";

export default function Permission({
  title,
  buttonText,
  onClick,
  buttonStyle,
  buttonTextStyle,
  titleStyle,
  buttonColor,
}: IPermissionProps) {
  return (
    <View style={styles.container}>
      <BackgroundGradient
        colorsInput={{
          dark: ["#673147", "#29141c"],
          light: ["#f08aff", "#f8d1ff"],
        }}
      />
      <Text style={titleStyle}>{title}</Text>
      <Button
        text={buttonText}
        onClick={onClick}
        textStyle={buttonTextStyle}
        buttonStyle={buttonStyle}
        buttonColor={buttonColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
