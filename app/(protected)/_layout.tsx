import React, { useEffect, useState } from "react";
import { useSession } from "@/providers/SessionProvider";
import { Slot, Stack, useRouter } from "expo-router";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

const ProtectedRouteLayout = () => {
  const { session } = useSession();
  const { currentTheme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session === undefined) {
      return;
    }

    // Defer navigation to prevent navigating before root layout is mounted
    if (!session) {
      const timeoutId = setTimeout(() => {
        console.log(
          "session",
          session,
          "Redirecting to Login Page from Layout Control"
        );
        router.replace("/login"); // Redirect to login if session is not present
      }, 0);

      return () => clearTimeout(timeoutId); // Cleanup in case the component unmounts
    } else {
      console.log("session exists, can access protected routes");
      setLoading(false); // Set loading to false if session exists
    }
  }, [session, router]);

  // Conditional Rendering: Show Loading Spinner if `loading` is true, otherwise render nested routes
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  ) : (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: currentTheme.colors.background, // Background color from the current theme
        },
        contentStyle: {
          backgroundColor: currentTheme.colors.background,
        },
        headerTintColor: currentTheme.colors.text, // Color for the header text and back button
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()} // Go back when pressed
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={currentTheme.colors.text}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="coffee"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
});

export default ProtectedRouteLayout;
