import React, { useEffect, useState } from 'react';
import { useSession } from '@/providers/SessionProvider';
import { Slot, useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const ProtectedRoute = () => {
  const { session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        console.log("session", session,'Redirecting to Login Page from Layout Control (From protected folder layout)');
        await router.replace("/login"); // Redirect to login if session is not present
      } else {
        console.log("session exist can access to protected routes (From protected folder layout)")
        setLoading(false); // Set loading to false if session exists
      }
    };

    checkSession();
  }, [session, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Slot />; // Render nested routes when session is valid
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
