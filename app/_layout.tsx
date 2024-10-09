import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
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

import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Padauk_400Regular } from "@expo-google-fonts/padauk";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
   const [loaded] = useFonts({
    poppins: Poppins_400Regular,
    poppins_bold: Poppins_700Bold,
    padauk_regular: Padauk_400Regular,
    mm_sagar: require("../assets/fonts/mm/MyanmarSagar.ttf"),
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
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <SessionProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </SessionProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
  );
}
