import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext"; // Language context
import { useTheme } from "@/context/ThemeContext"; // Theme context
import { textVariants } from "@/theme/textVariants"; // Import text variants
import ReactNativeElementDropdownComponent from "@/components/dropdown/ReactNativeElementDropdown";
import useAuth from "@/helpers/useAuth";

const Index = () => {
  const { session, handleSignOut } = useAuth(); // Use the hook to get session and signOut
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getAvailableLanguages } = useLanguage();
  const { currentTheme } = useTheme(); // Get the current theme
  const router = useRouter();
  const availableLanguages = getAvailableLanguages().map((language) => ({
    label: language,
    value: language,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.colors.background, paddingHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ ...textVariants.title, color: currentTheme.colors.text }}>
        {t("home.welcome")}
      </Text>

      <ReactNativeElementDropdownComponent
        data={availableLanguages} // Array of { label: string, value: string }
        labelField="label"
        valueField="value"
        currentSelection={currentLanguage}
        onChange={(value) => changeLanguage(value)}
        placeholder="Select language"
        label={t("language")}
      />

      {/* Conditionally render login or sign-out button based on session */}
      {!session ? (
        <TouchableOpacity
          style={{ backgroundColor: currentTheme.colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginVertical: 10, width: "80%", alignItems: "center" }}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={{ ...textVariants.defaults, color: currentTheme.colors.buttonText }}>Login</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={{ backgroundColor: currentTheme.colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginVertical: 10, width: "80%", alignItems: "center" }}
            onPress={() => router.push("/settings/")}
          >
            <Text style={{ ...textVariants.defaults, color: currentTheme.colors.buttonText }}>{t('settings')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: currentTheme.colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginVertical: 10, width: "80%", alignItems: "center" }}
            onPress={handleSignOut} // Sign out button handler
            accessibilityLabel="Sign Out"
          >
            <Text style={{ ...textVariants.defaults, color: currentTheme.colors.buttonText }}>{t('auth.signOut')}</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={{ backgroundColor: currentTheme.colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginVertical: 10, width: "80%", alignItems: "center" }}
        onPress={() => router.push("/(protected)/home")}
      >
        <Text style={{ ...textVariants.defaults, color: currentTheme.colors.buttonText }}>{t('home.home')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: currentTheme.colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginVertical: 10, width: "80%", alignItems: "center" }}
        onPress={() => router.push("/blog/")}
      >
        <Text style={{ ...textVariants.defaults, color: currentTheme.colors.buttonText }}>{t('blog')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: currentTheme.colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginVertical: 10, width: "80%", alignItems: "center" }}
        onPress={() => router.push("/routes")}
      >
        <Text style={{ ...textVariants.defaults, color: currentTheme.colors.buttonText }}>{t('allRoutes')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
