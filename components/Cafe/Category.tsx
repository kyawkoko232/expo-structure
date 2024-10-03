import React from "react";
import { Pressable, Text as RNText, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/context/ThemeContext";
import { createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { API_URL } from "@/config";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Text = createText<Theme>(); // Custom Text component from Restyle


type ItemProps = {
  id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  favourite: boolean;
  star: number;
  discount: number;
  onCall: () => void;
  onAdd: () => void;
};
export default function Category({
  id,
  name,
  description,
  price,
  discount,
  image,
  favourite,
  star,
  onCall,
  onAdd,
}: ItemProps) {
  const { currentTheme } = useTheme(); // Use the theme context
  const color = currentTheme.colors;

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.container} onPress={onCall}>
        <Image
          source={{ uri: API_URL + image }}
          style={styles.image}
          contentFit="contain"
          placeholder={blurhash}
        />
        <Pressable onPress={onAdd} style={styles.heartContainer}>
          <MaterialCommunityIcons
            name={favourite ? "cards-heart" : "cards-heart-outline"}
            size={18}
            color={color.primary} // Use dynamic color from the theme
          />
        </Pressable>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    width: "100%", // Adjust the width as needed
    position: "relative", // To ensure the heart icon is positioned correctly
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
  },
  heartContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333", // Darker text color for contrast
    textAlign: "center",
  },
});
