import {
  monsterIcons,
  cameraIcons,
} from "../assets/icons/EveryIconInOneFile/everyIcon";
import React from "react";
import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";

export type IconName = keyof typeof monsterIcons;
export type CameraIconName = keyof typeof cameraIcons;

// ==================================================

export interface ITheme {
  currentTheme: "dark" | "light";
  switchPosition: 0 | 1;
  currentIcon: "moon" | "sun";
}

export interface IThemeContextType {
  isAnimating: boolean;
  theme: ITheme;
  toggleTheme: () => void;
  finishAnimation: () => void;
}

export interface IconButtonProps {
  icon: React.FC<SvgProps>;
  buttonStyle?: StyleProp<ViewStyle>;
  onClick: (event: GestureResponderEvent) => void;
  iconWidth?: number;
  iconHeight?: number;
}

export interface ITextGradient {
  colors: [string, string];
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
}

export interface IGradient {
  colorsInput: {
    dark: [string, string];
    light: [string, string];
  };
}

export interface IThemeContext {
  children: React.ReactNode;
}

export interface ITextGradientProps {
  text: {
    text: string;
    style: object;
  };
  gradient: ITextGradient;
}

export interface IMonsterIconProps {
  icon: React.FC<SvgProps>;
  style: object;
}

export interface IMonsterBlockProps {
  name: string;
  icon: React.FC<SvgProps>;
  extraStyles?: object;
}

export interface IButtonProps {
  text: string;
  onClick: () => void;
  buttonStyle: Omit<ViewStyle, "backgroundColor">;
  textStyle: TextStyle;
  buttonColor: {
    main: string;
    onPress: string;
  };
}

export interface IAuthenticationProps {
  onAuthenticate: () => void;
}

export interface IPermissionProps {
  title: string;
  buttonText: string;
  onClick: () => void;
  buttonStyle: object;
  buttonTextStyle: object;
  titleStyle: object;
  buttonColor: {
    main: string;
    onPress: string;
  };
}

export interface INavigationHeader {
  title: string;
}

export interface INavigationFooter {
  children: React.ReactNode;
}
