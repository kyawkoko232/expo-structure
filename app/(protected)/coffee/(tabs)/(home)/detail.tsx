import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, { useState, useMemo } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Cart from "@/components/Cafe/Cart";
import { Image } from "expo-image";
import { useTheme } from "@/context/ThemeContext";
import { createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioGroup from "react-native-radio-buttons-group";
import { coffeeCategories, radio, sizes, sugar } from "@/data";
import DropDownPicker from "react-native-dropdown-picker";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateCart } from "@/providers/redux/slices/cartSlice";



const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { width, height } = Dimensions.get("window");

const DetailScreen = () => {
  const { currentTheme } = useTheme();
  const color = currentTheme.colors;
  const Text = createText<Theme>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const params = useLocalSearchParams();
  const { id, name, image } = params;

  console.log("Image passed to DetailScreen:", image);

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const radioButtons = useMemo(() => radio, []);

 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(sizes);

  
  const [sugarOpen, setSugarOpen] = useState(false);
  const [sugarPercent, setSugarPercent] = useState(null);
  const [sugarItems, setSugarItems] = useState(sugar);

  
  const [quantity, setQuantity] = useState(1); // Initial quantity set to 1


  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Handle Add to Cart button press
  const handleAddToCart = () => {
    // Dispatch action to update the cart with current details
    dispatch(
      updateCart({
        id: "cappuccino",
        quantity,
        size: value,
        sugar: sugarPercent,
      })
    );
    router.push("/coffee/order"); // Navigate to order page after adding to cart
  };

  const renderContent = () => (
    <>
      <Text variant="titleB" color="black">
        Cappuccino
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.spinnerContainer}>
          <Pressable onPress={decrementQuantity} style={styles.spinner}>
            <Text style={styles.spinnerText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable onPress={incrementQuantity} style={styles.spinner}>
            <Text style={styles.spinnerText}>+</Text>
          </Pressable>
        </View>
        <Text variant="textA">$6</Text>
      </View>

      <View style={styles.containerTwo}>
        <Text variant="titleB" color="black">
          Description
        </Text>
        <Text variant="textA" color="black" marginTop="sm">
          A cappuccino is a beloved espresso-based hot coffee drink made with
          layering of espresso, steamed milk, and milk foam on top.
        </Text>
      </View>

      {/* Hot or Iced */}
      <View style={styles.container}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          layout="row"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={styles.dropDownContainer}>
          <Text variant="titleB" color="black">
            Cup Size
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"Small"}
            placeholderStyle={styles.placeholderStyle}
            textStyle={styles.textStyle}
            style={styles.dropDownStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle} // For open dropdown
          />
        </View>
        <View style={styles.dropDownContainer}>
          <Text variant="titleB" color="black">
            Sugar
          </Text>
          <DropDownPicker
            open={sugarOpen}
            value={sugarPercent}
            items={sugarItems}
            setOpen={setSugarOpen}
            setValue={setSugarPercent}
            setItems={setSugarItems}
            placeholder={"Sugar"}
            placeholderStyle={styles.placeholderStyle}
            textStyle={styles.textStyle}
            style={styles.dropDownStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle} // For open dropdown
          />
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView
      style={{ minHeight: height, backgroundColor: color.secondary }}
    >
      {/* For Stack Screen Top */}
      <Stack.Screen
        options={{
          headerTitle: "Detail",
          headerTintColor: "black",
          headerStyle: { backgroundColor: color.secondary },
          headerBackTitleVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.navigate("/coffee/order")}>
              <Cart />
            </Pressable>
          ),
        }}
      />
      <View style={styles.ImageContainer}>
        <Image
          source={image} // Use the image passed via params
          style={styles.image}
          contentFit="contain"
          placeholder={blurhash}
        />
      </View>

      <FlatList
        data={[{}]} // Just pass a single item to render your content
        renderItem={renderContent}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
      />
      {/* Add to cart and Buy Now buttons */}
      <View style={styles.btnContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.btnText}>ADD TO CART</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: "black" }]}>
          <Text style={[styles.btnText, { color: "white" }]}>BUY NOW</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: -45,
  },
  image: {
    width: 250,
    height: 200,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 3,
    elevation: 5,
    shadowColor: "#4B2C20",
  },

  containerTwo: {
    marginTop: 10,
  },
  container: {
    marginVertical: 5,
    paddingVertical: 6,
  },
  dropDownContainer: {
    marginTop: 10,
    width: "45%",
  },
  dropDownStyle: {
    backgroundColor: "#4E8D7C", // Customize your dropdown button background color
    borderColor: "#4E8D7C", // Customize the border color if needed
    borderRadius: 10, // Round the dropdown button
  },
  dropDownContainerStyle: {
    backgroundColor: "#4E8D7C", // Background color when the dropdown is open
    borderColor: "#4E8D7C", // Optional: if you want a different border color when open
  },
  placeholderStyle: {
    color: "#ffffff", // Customize placeholder text color
    fontWeight: "bold", // Customize placeholder font style
  },
  textStyle: {
    color: "#ffffff", // Customize selected text color
    fontWeight: "bold", // Customize selected font style
  },
  spinnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  spinner: {
    width: 26,
    height: 26,
    backgroundColor: "#4E8D7C",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 5,
  },
  spinnerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },

  quantityText: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 20,
  },

  addToCartButton: {
    backgroundColor: "#4E8D7C", // Customize your button color
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  btnText: {
    fontWeight: "500",
  },

  button: {
    width: width / 2.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderWidth: 0.7,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
