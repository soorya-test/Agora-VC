import { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from "@react-navigation/native";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  return (
    <RNThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {children}
    </RNThemeProvider>
  );
}
