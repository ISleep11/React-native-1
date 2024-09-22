import { useState, createContext } from "react";
import { IThemeContext } from "../../types/types";
import { IThemeContextType } from "../../types/types";
import { ITheme } from "../../types/types";

export const themeContext = createContext<IThemeContextType>({
  isAnimating: false,
  theme: {
    currentTheme: "dark",
    switchPosition: 1,
    currentIcon: "moon",
  },
  toggleTheme: () => {},
  finishAnimation: () => {},
});

export default function ThemeContext({ children }: IThemeContext) {
  const [theme, setTheme] = useState<ITheme>({
    currentTheme: "dark",
    switchPosition: 1,
    currentIcon: "moon",
  });
  const [isAnimating, setIsAnimating] = useState(false);

  function toggleTheme() {
    if (isAnimating) return;
    setIsAnimating(true);
    setTheme((prev) => {
      if (prev.currentTheme === "dark") {
        return { currentTheme: "light", switchPosition: 0, currentIcon: "sun" };
      } else {
        return { currentTheme: "dark", switchPosition: 1, currentIcon: "moon" };
      }
    });
  }

  function finishAnimation() {
    setIsAnimating(false);
  }
  return (
    <themeContext.Provider
      value={{ isAnimating, theme, toggleTheme, finishAnimation }}
    >
      {children}
    </themeContext.Provider>
  );
}
