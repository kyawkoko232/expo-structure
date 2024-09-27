import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext"; // Language context

const index = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getAvailableLanguages } =
    useLanguage();
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>index</Text>


      <TouchableOpacity onPress={() => router.push("/blog")}>
        <Text>{t("home.welcome")}</Text>
        <View>
          {getAvailableLanguages().map((language) => (
            <TouchableOpacity
              key={language}
              onPress={() => changeLanguage(language)}
            >
              <Text>Switch to {language}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>


      <TouchableOpacity
           
           onPress={() => router.push("/(auth)/login")}
          >
            <Text
             
            >
            Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
           
           onPress={() => router.push("/(protected)/home")}
          >
            <Text
             
            >
            Home
            </Text>
          </TouchableOpacity>

  
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
