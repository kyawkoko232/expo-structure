import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllRoutes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Routes</Text>
      <View style={styles.linkContainer}>
        <Link href="/navigations/" style={styles.link}>
          Go to Navigation
        </Link>

        <Link href="/(protected)/settings/" style={styles.link}>
          Go to Settings
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default AllRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', // Light gray background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  linkContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  link: {
    padding: 10,
    backgroundColor: '#007bff', // Blue background for link
    color: '#fff', // White text color
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: '600',
  },
});
