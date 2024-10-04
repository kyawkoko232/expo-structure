import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useTheme } from "@/context/ThemeContext";

export default function Order() {
  const {currentTheme }= useTheme()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:currentTheme.colors.background  }}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150,
          // backgroundColor: "#eee",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../../assets/images/EmptyLottie.json")}
      />
      <Text>You don't have any order yet!!!</Text>
    </View>
  );
}
