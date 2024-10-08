import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { textVariants } from "@/theme/textVariants";

const AllRoutes = () => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const router = useRouter();

  const renderButton = (href: string, label: string) => (
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
      onPress={() => router.push(href)}
    >
      <Text style={{ ...textVariants.default, color: currentTheme.colors.textOpposite }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>All Routes</Text>

      {renderButton("/navigations/", "Go to Navigation")}
      {renderButton("/(protected)/", "Protected")}
      {renderButton("/(protected)/coffee/", "Coffee")}
      {renderButton("/blog/", t("blog"))}

    </SafeAreaView>
  );
};

export default AllRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
