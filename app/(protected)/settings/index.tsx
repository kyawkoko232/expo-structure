import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const Settings = () => {
  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <Link href="/(protected)/settings/theme"> Theme</Link>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({})