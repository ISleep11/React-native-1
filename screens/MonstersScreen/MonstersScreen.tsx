import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import MonsterBlock from "../../components/MonsterBlock/MonsterBlock";
import { monsterIcons } from "../../assets/icons/EveryIconInOneFile/everyIcon";
import BackgroundGradient from "../../components/BackgroundGradient/BackgroundGradient";
import { counter } from "../../stores/mobx-lite/CounterStore";
import { observer } from "mobx-react-lite";

const MonsterScreen = observer(() => {
  const [loaded, error] = useFonts({
    Lora: require("../../assets/fonts/Lora.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {}, [counter.value]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <BackgroundGradient
        colorsInput={{
          dark: ["#673147", "#29141c"],
          light: ["#f08aff", "#f8d1ff"],
        }}
      />
      <FlatList
        data={monsterIcons}
        renderItem={(item) => {
          return (
            <MonsterBlock
              name={item.item.monsterName}
              icon={item.item.icon}
              extraStyles={{
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderTopWidth: item.index === 0 ? 2 : 0,
                borderBottomWidth: 2,
              }}
              key={item.item.id}
            />
          );
        }}
        ListFooterComponent={() => {
          return (
            <View style={styles.counterContainer}>
              <Text style={styles.counterValue}>{counter.value}</Text>
            </View>
          );
        }}
      />

      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
    </SafeAreaView>
  );
});

export default MonsterScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
  },

  text: {
    fontFamily: "Lora",
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  gradient: {
    width: 200,
    height: 40,
  },

  iconContainer: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 10,
  },
  counterValue: {
    fontSize: 35,
    color: "white",
    marginTop: 10,
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  counterContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
});
