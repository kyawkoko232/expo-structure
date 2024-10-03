import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/context/ThemeContext"; // Theme context

const SettingsScreen = () => {
  const { currentTheme, changeTheme, getThemeKeys } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: currentTheme.colors.background },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Theme Section */}
        <Text style={[styles.header, { color: currentTheme.colors.text }]}>
          Theme Settings
        </Text>
        <View style={styles.buttonContainer}>
          {getThemeKeys().map((themeKey) => (
            <TouchableOpacity
              key={themeKey}
              style={[
                styles.themeButton,
                { backgroundColor: currentTheme.colors.primary },
              ]}
              onPress={() => changeTheme(themeKey)}
            >
              <Text
                style={[styles.buttonText, { color: currentTheme.colors.white }]}
              >
                Switch to {themeKey}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme Colors Display */}
        <View style={styles.themeColorContainer}>
          <Text style={[styles.header, { color: currentTheme.colors.text }]}>
            Theme Colors:
          </Text>
          {Object.entries(currentTheme.colors).map(([key, value]) => (
            <View key={key} style={styles.colorItem}>
              <Text
                style={[styles.colorText, { color: currentTheme.colors.text }]}
              >
                {key}:
              </Text>
              <View style={[styles.colorBox, { backgroundColor: value }]} />

              <Text
                style={[styles.colorCode, { color: currentTheme.colors.text }]}
              >
                {value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  themeButton: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  languageButton: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  themeColorContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  colorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  colorText: {
    fontSize: 16,
    flex: 1,
  },
  colorBox: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  colorCode: {
    fontSize: 14,
    flex: 2,
  },
});
