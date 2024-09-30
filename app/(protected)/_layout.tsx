import React, { useEffect, useState } from 'react';
import { useSession } from '@/providers/SessionProvider';
import { Slot, useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const ProtectedRoute = () => {
  const { session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      console.log("session", session, 'Redirecting to Login Page from Layout Control');
      router.replace("/login"); // Redirect to login if session is not present
    } else {
      console.log("session exists, can access protected routes");
      setLoading(false); // Set loading to false if session exists
    }
  }, [session, router]);

  // Conditional Rendering: Show Loading Spinner if `loading` is true, otherwise render nested routes
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  ) : (
    <Slot /> // Render nested routes when session is valid
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});

export default ProtectedRoute;
