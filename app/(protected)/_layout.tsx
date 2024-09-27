import React, { useEffect, useState } from "react";
import { useSession } from "@/providers/SessionProvider";
import { Slot, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ProtectedRoute = () => {
  const { session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        console.log(
          "session",
          session,
          "Redirecting to Login Page from Layout Control (From protected folder layout)"
        );
        await router.replace("/login"); // Redirect to login if session is not present
      } else {
        console.log(
          "session exist can access to protected routes (From protected folder layout)"
        );
        setLoading(false); // Set loading to false if session exists
      }
    };

    checkSession();
  }, [session, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            headerTitle: "Home Title",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="star-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Tabs",
            headerTitle: "Tab Title",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="ice-cream-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            headerTitle: "Setting Title",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
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

export default ProtectedRoute;
