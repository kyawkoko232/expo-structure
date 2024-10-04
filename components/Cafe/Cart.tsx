import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/context/ThemeContext";

export default function Cart() {
  const { currentTheme } = useTheme();
  const color = currentTheme.colors;
  return (
    <View style={{ flexDirection: "row" }}>
      <Ionicons name="cart-outline" size={28} color={color.text} />
      <View style={styles.container}>
        <Text style={styles.budge}>13</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3E7163",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
    marginTop: -4,
  },
  budge: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
