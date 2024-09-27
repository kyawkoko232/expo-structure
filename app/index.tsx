import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import { useLanguage } from "@/context/LanguageContext"; // Language context
import ReactNativeElementDropdownComponent from "@/components/dropdown/ReactNativeElementDropdown";


const index = () => {
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
      <Text style={styles.title}>{t("home.welcome")}</Text>

      <ReactNativeElementDropdownComponent
        data={availableLanguages} // Array of { label: string, value: string }
        labelField="label"
        valueField="value"
        currentSelection={currentLanguage}
        onChange={(value) => changeLanguage(value)}
        placeholder="Select language"
        label="Language"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(protected)/home")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/settings/")}
      >
        <Text style={styles.buttonText}>Settings</Text>
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
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
});
