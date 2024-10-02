import { useFonts } from "expo-font"; // Importing useFonts from expo-font
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { Provider } from "react-redux";
import { store } from "@/providers/redux/store";

import { SessionProvider } from "@/providers/SessionProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider as RestyleThemeProvider } from "@/context/ThemeContext"; // Import your custom ThemeProvider

import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Padauk_400Regular } from "@expo-google-fonts/padauk";

import "@/i18n";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load the required fonts
  const [fontsLoaded] = useFonts({
    poppins : Poppins_400Regular,
    poppins_bold : Poppins_700Bold,
    padauk_regular: Padauk_400Regular,
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  // If fonts are not loaded, return null to show the splash screen
  if (!fontsLoaded) {
    return null; // or return a loading indicator
  }

  return (
    <Provider store={store}>
      <LanguageProvider>
        <RestyleThemeProvider>
          <SessionProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </SessionProvider>
        </RestyleThemeProvider>
      </LanguageProvider>
    </Provider>
  );
}
