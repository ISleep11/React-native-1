import React, { useEffect, useState } from "react";
import { View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import WifiOnIcon from "../../assets/icons/IconSVG/Wifi.svg";
import WifiOffIcon from "../../assets/icons/IconSVG/Wifi-off.svg";

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected || false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ marginRight: 20 }}>
      {isConnected ? (
        <WifiOnIcon width={30} height={30} />
      ) : (
        <WifiOffIcon width={30} height={30} />
      )}
    </View>
  );
};

export default NetworkStatus;
