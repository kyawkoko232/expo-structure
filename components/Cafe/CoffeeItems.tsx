import { View, ImageBackground, Pressable, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
//   import { API_URL } from "@/config";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useTheme } from "@/context/ThemeContext";
import { color, createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";

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

export default function CoffeeItems({
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
    <View style={styles.container}>
      <Pressable onPress={onCall}>
        <ImageBackground
          // source={{ uri: API_URL+ image }}
          source={image}
          style={styles.imageView}
          imageStyle={styles.image}
        >
          <Pressable onPress={onAdd}>
            <View style={styles.heartContainer}>
              <MaterialCommunityIcons
                name={favourite ? "cards-heart" : "cards-heart-outline"}
                size={18}
                color={color.primary} // Use dynamic color from the theme
              />
            </View>
          </Pressable>
        </ImageBackground>
      </Pressable>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        {/* <Ionicons
          name="star"
          size={12}
          color="orange"
          style={{ paddingTop: 1 }}
        />
        <Text style={styles.star}>{star}</Text> */}
      </View>
      {/* <Text style={styles.description}>
        {description.length > 25
          ? description.substring(0, 25) + "..."
          : description}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Text style={styles.discount}>${discount.toFixed(2)}</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 17,
  },
  imageView: {
    width: 200,
    height: 250,
    resizeMode: "cover",
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 5,
  },
  heartContainer: {
    backgroundColor: "#00000015",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  name: {
    color: "gray",
    fontWeight: "600",
    marginRight: 7,
  },
  star: {
    marginHorizontal: 2,
    fontSize: 13,
  },
  quantity: {
    color: "gray",
    fontSize: 13,
  },
  description: {
    marginVertical: 7,
    fontSize: 15,
    fontWeight: "500",
  },
  priceContainer: {
    flexDirection: "row",
  },
  price: {
    marginRight: 7,
    color: "#007618",
    fontSize: 15,
    fontWeight: "500",
  },
  discount: {
    color: "gray",
    textDecorationLine: "line-through",
  },
});
