import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext"; // Assuming you have a theme context
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const { currentTheme } = useTheme();
  const color = currentTheme.colors;
  const router = useRouter();

  // Function to handle navigation to the theme selection screen
  const navigateToThemeSelection = () => {
    router.push("/settings/theme"); // Update this to your actual route
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: color.text }]}>Settings</Text>

        {/* Simple button for theme selection */}
        <TouchableOpacity
          style={[styles.section, { backgroundColor: color.primary, borderColor: color.border }]}
          onPress={navigateToThemeSelection} // Navigate to theme selection on press
        >
          <View style={styles.row}>
            <Ionicons name="color-palette-outline" size={24} color={color.textOpposite} />
            <Text style={[styles.label, { color: color.textOpposite }]}>Theme</Text>
          </View>
        </TouchableOpacity>

        {/* Other Settings Options */}
        <TouchableOpacity style={[styles.section, { backgroundColor: color.primary, borderColor: color.border }]}>
          <View style={styles.row}>
            <Ionicons name="person-circle-outline" size={24} color={color.textOpposite} />
            <Text style={[styles.label, { color: color.textOpposite }]}>Account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.section, { backgroundColor: color.primary, borderColor: color.border }]}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={24} color={color.textOpposite} />
            <Text style={[styles.label, { color: color.textOpposite }]}>Notifications</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.section, { backgroundColor: color.primary, borderColor: color.border }]}>
          <View style={styles.row}>
            <Ionicons name="lock-closed-outline" size={24} color={color.textOpposite} />
            <Text style={[styles.label, { color: color.textOpposite }]}>Privacy & Security</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1, // Add border for sections
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default SettingsScreen;
