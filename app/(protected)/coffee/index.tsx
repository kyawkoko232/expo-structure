import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoardingScreen from "@/screen/onboarding/onboardingScreen";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingShown, setOnboardingShown] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingShown");
        if (value === "true") {
          setOnboardingShown(true);
        }
      } catch (error) {
        console.error("Error reading onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : onboardingShown ? (
        <Redirect href="/(protected)/coffee/(tabs)" />
      ) : (
        <OnBoardingScreen />
      )}
    </View>
  );
}
