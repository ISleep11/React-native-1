import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { ITextGradientProps } from "../../types/types";

export default function TextGradient({ text, gradient }: ITextGradientProps) {
  return (
    <View style={styles.container}>
      <MaskedView
        maskElement={
          <View style={styles.containerContent}>
            <Text style={text.style}>{text.text} </Text>
          </View>
        }
        style={styles.maskedView}
      >
        <LinearGradient
          colors={gradient.colors}
          start={gradient.start}
          end={gradient.end}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#757575",
  },
  containerContent: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
  },
  maskedView: {
    height: "100%",
    width: "100%",
  },
});
