import { useSession } from "@/providers/SessionProvider";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { Redirect, Tabs } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const { currentTheme } = useTheme();

  if (isLoading) {
    return (
      <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
        Loading...
      </ThemedText>
    );
  }

  // Uncomment the following lines to enforce authentication
  // if (!session) {
  //   console.log("redirected from tab page");
  //   return <Redirect href="/login" />;
  // }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: currentTheme.colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            borderTopColor: currentTheme.colors.border,
            backgroundColor: currentTheme.colors.background,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="pay"
          options={{
            title: "Scan/Pay",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name={"qrcode-scan"} color={color} size={20} />
            ),
          }}
        />
        <Tabs.Screen
          name="(order)"
          options={{
            title: "Order",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "coffee" : "coffee-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(account)"
          options={{
            title: "Account",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "account-circle" : "account-circle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="reward"
          options={{
            title: "Rewards",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "star" : "star-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
