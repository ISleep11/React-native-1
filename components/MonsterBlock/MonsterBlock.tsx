import { View, StyleSheet, Platform } from "react-native";
import TextGradient from "../TextGradient/TextGradient";
import MonsterIcon from "../MonsterIcon/MonsterIcon";
import { IMonsterBlockProps } from "../../types/types";

export default function MonsterBlock({
  name,
  icon,
  extraStyles,
}: IMonsterBlockProps) {
  return (
    <View style={{ ...styles.monsterCotainer, ...extraStyles }}>
      <View style={styles.iconContainer}>
        <MonsterIcon icon={icon} style={styles.icon} />
      </View>

      <View style={styles.textContainer}>
        <TextGradient
          text={{ text: `${name}`, style: styles.text }}
          gradient={{
            colors: ["black", "white"],
            start: { x: 1, y: 1 },
            end: { x: 0, y: 0 },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Lora",
    fontSize: Platform.OS === "ios" ? 37 : 35,
    color: "white",
    textAlign: "center",
  },
  monsterCotainer: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: 175,
    borderColor: "#757575",
  },
  iconContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
  },
  textContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
