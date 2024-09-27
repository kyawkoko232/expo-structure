import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useSession } from "@/providers/SessionProvider"; // Adjust this to your actual session hook

const Home = () => {
  const { session, signOut } = useSession(); // Destructure session and signOut from useSession
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(); // Call the signOut method
      router.replace("/login"); // Redirect to login page after sign-out
    } catch (error: any) {
      console.error("Error during sign-out:", error);

      // Log additional error details
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }

      // Optionally, show an error message to the user
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Home Page</Text>
        <View style={styles.linkContainer}>
          {/* Conditionally render login or sign-out button based on session */}
          {!session ? (
            <TouchableOpacity style={styles.primaryButton}>
              <Link href="/login" style={styles.linkText}>
                Login
              </Link>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleSignOut} // Sign out button handler
              accessibilityLabel="Sign Out"
            >
              <Text style={styles.linkText}>Sign Out</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.primaryButton}>
            <Link href="/(protected)/(tabs)/" style={styles.linkText}>
              Go to Tabs
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton}>
            <Link href="/blog" style={styles.linkText}>
              Go to Blog
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton}>
            <Link href="/" style={styles.linkText}>
              Root
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#6c757d", // A different color for secondary buttons
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
