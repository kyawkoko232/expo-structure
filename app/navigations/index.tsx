import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const NavIndex = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Navigation Index</Text>
      <View style={styles.linkContainer}>
        <Link href="/navigations/drawer/" style={styles.link}>
          Open Drawer Navigation
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default NavIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  linkContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  link: {
    padding: 15,
    backgroundColor: '#007bff', // Blue background for link
    color: '#fff', // White text color
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});
