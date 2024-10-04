import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { useSession } from "@/providers/SessionProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  runOnUI,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

import { Stack, useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import Cart from "@/components/Cafe/Cart";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { width, height } = Dimensions.get("window");

export default function Account() {
  const { currentTheme } = useTheme();
  const color = currentTheme.colors;
  const Text = createText<Theme>();
  const router = useRouter();
  const { signOut } = useSession();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView
      style={{
        minHeight: height,
        backgroundColor: color.background,
        paddingHorizontal: 20,
      }}
    >
      <StatusBar style="dark" />
      <View style={styles.topContainer}>
        <View>
          <Text variant="titleA">Account</Text>
          <Text variant="textA">Welcome Ykt!</Text>
        </View>
        <Image
          style={styles.imagePng}
          source={require("@/assets/images/PNG image.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginTop: 10 }}
      >
        <View>
          <Text variant="titleB">Profile</Text>
          <View style={{ marginVertical: 10, gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems:"center" }}
            >
              <Text variant="textA">Personal Info</Text>
              <Pressable>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Cards & Payments</Text>
              <Pressable>
                <Ionicons name="card-outline" size={24} color="black" />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Transaction History</Text>
              <Pressable>
                <Ionicons name="options-outline" size={24} color="black" />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Privacy & Data</Text>
              <Pressable>
                <Ionicons name="hand-left-outline" size={24} color="black" />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Account ID</Text>
              <Pressable>
                <Ionicons name="id-card-outline" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{marginTop:10}}>
          <Text variant="titleB">Security</Text>
          <View style={{ marginVertical: 10, gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Personal Info</Text>
              <Pressable>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Cards & Payments</Text>
              <Pressable>
                <Ionicons name="card-outline" size={24} color="black" />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Transaction History</Text>
              <Pressable>
                <Ionicons name="options-outline" size={24} color="black" />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Privacy & Data</Text>
              <Pressable>
                <Ionicons name="hand-left-outline" size={24} color="black" />
              </Pressable>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}
            >
              <Text variant="textA">Account ID</Text>
              <Pressable>
                <Ionicons name="id-card-outline" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imagePng: {
    width: 80,
    height: 80,
  },
});
