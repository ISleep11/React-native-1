// app.config.js
import "dotenv/config";

export default {
  expo: {
    name: "react-native-sw-guide",
    slug: "react-native-sw-guide",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splashScreen/SplashScreen.png",
      resizeMode: "contain",
      backgroundColor: "#673147",
    },
    ios: {
      supportsTablet: true,
      NSFaceIDUsageDescription: "Face ID is used to authenticate the user.",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-font", "expo-secure-store"],
  },
};
