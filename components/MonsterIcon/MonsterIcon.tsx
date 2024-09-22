import { View, Text } from "react-native";
import { IMonsterIconProps } from "../../types/types";

export default function MonsterIcon({ icon: Icon, style }: IMonsterIconProps) {
  if (!Icon) {
    return (
      <Text style={{ color: "#f74f4f" }}>
        Что-то пошло не так при загрузке иконки
      </Text>
    );
  }

  return (
    <View style={style}>
      <Icon />
    </View>
  );
}
