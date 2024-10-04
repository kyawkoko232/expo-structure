import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/context/ThemeContext'

const index = () => {
  const {currentTheme} = useTheme()
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor: currentTheme.colors.background,
    }}>
      <Text>Home Page for Auth Users</Text>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})