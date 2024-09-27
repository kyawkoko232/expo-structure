import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from "expo-router";

const index = () => {
    const router = useRouter();
  return (
    <SafeAreaView>
      <Text>index</Text>
      <TouchableOpacity
            onPress={() => router.push("/blog")}
          >
            <Text >
               home
            </Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})