import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { Provider } from "react-redux";
import { store } from "@/providers/redux/store";
import { SessionProvider } from "@/providers/SessionProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import "@/i18n";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
    <LanguageProvider>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SessionProvider>
        <Stack screenOptions={{ headerShown: false }} />
        </SessionProvider>
      </ThemeProvider>
    </LanguageProvider>
    </Provider>
  );
}
