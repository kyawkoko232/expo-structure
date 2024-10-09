import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext"; // Language context
import ReactNativeElementDropdownComponent from "@/components/dropdown/ReactNativeElementDropdown";
import useAuth from "@/helpers/useAuth";
import { textVariants } from "../constants/Fonts";

const index = () => {
  const { session, handleSignOut } = useAuth(); // Use the hook to get session and signOut
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getAvailableLanguages } =
    useLanguage();
  const router = useRouter();
  const availableLanguages = getAvailableLanguages().map((language) => ({
    label: language,
    value: language,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, textVariants.poppins]}>
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
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={[textVariants.poppins, styles.buttonText]}>Login</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/settings/")}
          >
            <Text style={[textVariants.poppins, styles.buttonText]}>
              {t("settings")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignOut} // Sign out button handler
            accessibilityLabel="Sign Out"
          >
            <Text style={[textVariants.poppins, styles.buttonText]}>
              {t("auth.signOut")}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(protected)/home")}
      >
        <Text style={[textVariants.poppins, styles.buttonText]}>
          {t("home.home")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/blog/")}
      >
        <Text style={[textVariants.poppins, styles.buttonText]}>
          {t("blog")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/routes")}
      >
        <Text style={[textVariants.poppins, styles.buttonText]}>
          {t("allRoutes")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
  },
  dropdown: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
  },
  button: {
    backgroundColor: "#ff6f61",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
