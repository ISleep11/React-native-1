import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MonsterScreen from "../../screens/MonstersScreen/MonstersScreen";
import BossesScreen from "../../screens/ButtonsScreen/ButtonsScreen";
import StorageIcon from "../../assets/icons/IconSVG/Storage.svg";
import CameraIcon from "../../assets/icons/IconSVG/Camera.svg";
import TestScreen from "../../screens/StorageScreen/StorageScreen";
import CameraScreen from "../../screens/CameraScreen/CameraScreen";
import ThemeSwitch from "../../components/ThemeToggle/ThemeToggle";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import UserIcon from "../../assets/icons/IconSVG/User.svg";
import QuestionMarkIcon from "../../assets/icons/IconSVG/QuestionMark.svg";
import { themeContext } from "../../context/ThemeContext/ThemeContext";
import { useContext } from "react";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";

const Tab = createBottomTabNavigator();

export default function Navigator() {
  const themeData = useContext(themeContext);

  return (
    <ThemeContext>
      <NavigationContainer
        theme={
          themeData.theme.currentTheme === "dark" ? DarkTheme : DefaultTheme
        }
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: "#454545",
            },
            header: () => <NavigationHeader title={route.name} />,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              let IconName;
              if (route.name === "Monsters") IconName = UserIcon;
              else if (route.name === "Buttons") IconName = QuestionMarkIcon;
              else if (route.name === "Storage") IconName = StorageIcon;
              else if (route.name === "Camera") IconName = CameraIcon;
              return IconName ? (
                <IconName
                  width={35}
                  height={35}
                  color={focused ? "#ffabcd" : "#abacff"}
                />
              ) : null;
            },
            tabBarItemStyle: {
              borderRightColor: "grey",
              borderRightWidth: route.name === "Camera" ? 0 : 1,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: "grey",
              borderBottomColor: "grey",
            },
            headerRight: () => <ThemeSwitch />,
          })}
        >
          <Tab.Screen name="Monsters" component={MonsterScreen} />
          <Tab.Screen name="Buttons" component={BossesScreen} />
          <Tab.Screen name="Storage" component={TestScreen} />
          <Tab.Screen name="Camera" component={CameraScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext>
  );
}
