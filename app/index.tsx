import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext"; // Language context
import { textVariants } from "@/theme/textVariants"; // Import text variants
import useAuth from "@/helpers/useAuth";
import { createBox, createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { useTheme } from "@/context/ThemeContext";

const Box = createBox<Theme>();
const TextStyled = createText<Theme>();

const Index = () => {
  const { session, handleSignOut } = useAuth();

  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const router = useRouter();
 
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ ...textVariants.titleB, color: currentTheme.colors.background }}>
        {t("home.welcome")}
      </Text>

      {/* Conditionally render login or sign-out button based on session */}
      {!session ? (
        <TouchableOpacity
          style={{
            backgroundColor: currentTheme.colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginVertical: 10,
            width: "80%",
            alignItems: "center",
          }}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text
            style={{ ...textVariants.default, color: currentTheme.colors.background }}
          >
            Login
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={{
              backgroundColor: currentTheme.colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginVertical: 10,
              width: "80%",
              alignItems: "center",
            }}
            onPress={handleSignOut} // Sign out button handler
            accessibilityLabel="Sign Out"
          >
            <Text
              style={{
                ...textVariants.default,
                color: currentTheme.colors.textOpposite,
              }}
            >
              {t("auth.signOut")}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: currentTheme.colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginVertical: 10,
          width: "80%",
          alignItems: "center",
        }}
        onPress={() => router.push("/routes")}
      >
        <Text
          style={{ ...textVariants.default, color: currentTheme.colors.textOpposite }}
        >
          {t("allRoutes")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: currentTheme.colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginVertical: 10,
          width: "80%",
          alignItems: "center",
        }}
        onPress={() => router.push("/settings/")}
      >
        <Text
          style={{
            ...textVariants.default,
            color: currentTheme.colors.textOpposite,
          }}
        >
          {t("settings")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
