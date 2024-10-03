import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import Cart from "@/components/Cafe/Cart";
import { StatusBar } from "expo-status-bar";
import Title from "@/components/Cafe/Title";
import Category from "@/components/Cafe/Category";
import { coffeeCategories } from "@/data";
import { CategoryType } from "@/types";

import { useTheme } from "@/context/ThemeContext";
import { createBox, createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const { width, height } = Dimensions.get("window");

const HomePage = () => {
  const { currentTheme } = useTheme();
  const color = currentTheme.colors;
  const Text = createText<Theme>();
  const Box = createBox<Theme>();

  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const router = useRouter();
  const onPressToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const onPressBottom = () => {
    scrollRef.current?.scrollTo({
      y: height,
      animated: true,
    });
  };

  const saveProductToRedux = (id: string, name: string) => {
    router.push({
      pathname: "/(protected)/coffee/(home)/detail",
      params: { id, name }, // Data passed as query parameters
    });
  };

  const addToFavourite = async (item: CategoryType) => {
    try {
      const data = { id: item.id, data: { favourite: !item.favourite } };
      // const data = { id: "uuid1", data: { favourite: !item.favourite } };
      // await dispatch(updateFavouriteApi(data)).unwrap();
    } catch (error: any) {
      console.log("Error-----", error);
      // Toast.show(error, {
      //   duration: Toast.durations.SHORT,
      // });
    }
  };

  return (
    <SafeAreaView
      style={{
        minHeight: height,
        backgroundColor: color.background,
      }}
    >
      {/* Nav Bar */}
      <View style={[styles.navContainer, { backgroundColor: color.background }]}>
        <StatusBar style="dark" />
        <Pressable onPress={onPressToTop}>
          <Image
            style={styles.image}
            source={require("@/assets/images/CoffeeShot logo.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Pressable onPress={() => router.navigate("/coffee/order")}>
          <Cart />
        </Pressable>
      </View>
      {/* Body */}
      <View style={{ paddingHorizontal: 15, marginBottom: 100 }}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          <View style={styles.topContainer}>
            <View>
              <Text variant="titleB">Good Morning!</Text>
              <Text variant="textA">Login and get free ☕️</Text>
            </View>
            <Image
              style={styles.imagePng}
              source={require("@/assets/images/PNG image.png")}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </View>

         <View style={{marginHorizontal:5}}>
         <Box backgroundColor="success" style={styles.top2Container}>
            <Text style={{ color: color.background, fontSize: 20 }}>
              Join the Rewards program to enjoy free beverages, special offers
              and more!
            </Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, { backgroundColor: color.secondary }]}
              >
                <Text style={{ color: color.background, fontWeight: "500" }}>
                  JOIN NOW
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: color.background }]}
              >
                <Text style={{ color: color.text, fontWeight: "500" }}>
                  GUEST ORDER
                </Text>
              </Pressable>
            </View>
          </Box>
          <View
            style={[styles.top3Container, { backgroundColor: color.background }]}
          >
            <Pressable>
              <Text
                style={{ color: color.text, fontSize: 17, fontWeight: "500" }}
              >
                Already have an account?
              </Text>
            </Pressable>
            <Pressable
              style={styles.loginBtn}
              onPress={() => router.navigate("/(auth)/login")}
            >
              <Text style={[styles.text, { color: color.success }]}>Login</Text>
            </Pressable>
          </View>
         </View>

          <View>
            <Title
              title="Drinks"
              action="See All"
              onPressAction={onPressBottom}
            />
            <FlashList
              data={coffeeCategories}
              numColumns={2}
              centerContent={true}
              renderItem={({ item }) => (
                <Category
                  {...item}
                  onCall={() => saveProductToRedux(item.id, item.name)}
                  onAdd={() => addToFavourite(item)}
                />
              )}
              estimatedItemSize={80}
              showsHorizontalScrollIndicator={false}
            />
            <View style={{ marginBottom: 120 }} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 4 }, // Adjust height for deeper shadow
    shadowOpacity: 0.4, // Reduce opacity for a softer shadow
    shadowRadius: 5, // Slightly larger radius for a smoother effect
    elevation: 5, // For Android shadow
    padding: 15,
    shadowColor: "accent",
  },

  image: {
    width: 30,
    height: 40,
    resizeMode: "contain",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imagePng: {
    width: 80,
    height: 80,
  },
  top2Container: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  button: {
    width: width / 2.5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 13,
    borderRadius: 20,
  },
  top3Container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  text: {
    fontSize: 17,
    fontWeight: "medium",
  },
  loginBtn: {
    borderWidth: 2,
    borderColor: "#4E8D7C",
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
  },
});
