import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar"; // Import expo-status-bar
import { Provider } from "react-redux";
import { store } from "@/providers/redux/store";
import { SessionProvider } from "@/providers/SessionProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext"; // Import ThemeProvider and useTheme

import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Padauk_400Regular } from "@expo-google-fonts/padauk";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayoutInner = () => {
  const { currentTheme } = useTheme(); // Access the current theme from ThemeContext

  return (
    <>
      <View
        style={{ flex: 1, backgroundColor: currentTheme.colors.background }}
      >
        <StatusBar style={currentTheme.name === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: currentTheme.colors.background,
            },
          }}
        />
      </View>
    </>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    poppins: Poppins_400Regular,
    poppins_bold: Poppins_700Bold,
    padauk_regular: Padauk_400Regular,
    mm_sagar: require("../assets/fonts/MyanmarSagar.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing or a loading indicator while fonts are loading
  }

  return (
    <Provider store={store}>
      <LanguageProvider>
        {/* ThemeProvider should wrap the entire app */}
        <ThemeProvider>
          <SessionProvider>
            {/* Use RootLayoutInner to handle the StatusBar based on the current theme */}
            <RootLayoutInner />
          </SessionProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
  );
}
