import {
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { API_URL } from "@/config";
import { Image } from "expo-image"; // Use Expo's Image for optimized images
import { useTheme } from "@/context/ThemeContext"; // Use your ThemeContext
import { createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme"; // Your Restyle theme setup

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Text = createText<Theme>();

type ProductProps = {
  id: string;
  name: string;
  star: number;
  price: number;
  discount: number;
  image: string;
  favourite: boolean;
  description: string;
  onCall: () => void;
  onAdd: () => void;
};

export default function Product({
  id,
  name,
  star,
  price,
  discount,
  image,
  favourite,
  description,
  onCall,
  onAdd,
}: ProductProps) {
  const { currentTheme } = useTheme(); // Use your custom theme context
  const color = currentTheme.colors;

  return (
    <View style={styles.wrapper}>
      <Pressable style={[styles.container,{backgroundColor: currentTheme.colors.background}]} onPress={onCall}>
        <Image
          source={{ uri: API_URL + image }} // Adjust image source
          style={styles.image}
          contentFit="contain"
          placeholder={blurhash}
        />
        <Pressable onPress={onAdd} style={styles.heartContainer}>
          <Ionicons
            name={favourite ? "heart" : "heart-outline"}
            size={18}
            color={color.primary} // Use dynamic color from the theme
          />
        </Pressable>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="orange" />
          <Text style={styles.star}>{star}</Text>
        </View>
        <Text style={styles.description}>
          {description.length > 25 ? description.substring(0, 25) + "..." : description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {discount > 0 && (
            <Text style={styles.discount}>${discount.toFixed(2)}</Text>
          )}
        </View>
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
    height: 50,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
  },
  heartContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333", // Darker text color for contrast
    textAlign: "center",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
  },
  star: {
    fontSize: 12,
    marginLeft: 3,
    color: "#888", // Star rating color
  },
  description: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
    marginVertical: 5,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "#007618",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 5,
  },
  discount: {
    color: "#888",
    textDecorationLine: "line-through",
    fontSize: 13,
  },
});
