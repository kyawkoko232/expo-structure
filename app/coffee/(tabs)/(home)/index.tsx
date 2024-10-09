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
import Title from "@/components/Cafe/Title";
import Category from "@/components/Cafe/Category";
import { useTheme } from "@/context/ThemeContext";
import { createBox, createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useAuth from "@/helpers/useAuth";
import LogoutButton from "@/components/auth/LogoutButton";
import { useScrollToTop } from "@react-navigation/native";

import {
  fetchProducts,
  selectAllProducts,
  updateFavouriteApi,
} from "@/providers/redux/slices/productSlice";
import { fetchRequiredInfo } from "@/providers/redux/slices/requiredInfoSlice";
import Product from "@/components/Cafe/Product";
import { CategoryType, ProductType } from "@/types";

const { width } = Dimensions.get("window");

const HomePage = () => {
  const { currentTheme } = useTheme();
  const { session, handleSignOut } = useAuth();
  const color = currentTheme.colors;
  const Text = createText<Theme>();
  const Box = createBox<Theme>();

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const { width, height } = Dimensions.get("window");

  const navigation = useNavigation();
  const [select, setSelect] = useState("uuid1");
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);

  const productsLoading = useAppSelector((state) => state.products.loading);
  const errorStatus = useAppSelector((state) => state.products.error);
  const categories: CategoryType[] = useAppSelector(
    (state) => state.requiredInfo.categories
  );
  const productLists = products.filter(
    (product) => product.categoryId === select
  );
  console.log("Product List form index", productLists);

  // Fetch required information when the component mounts
  useEffect(() => {
    dispatch(fetchRequiredInfo());
    dispatch(fetchProducts());
    navigation.setOptions({ headerShown: false });
  }, [dispatch, navigation]);

  if (productsLoading) {
    return <Text>Loading...</Text>;
  }

  if (categories.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No Categories Found!</Text>
        <Pressable onPress={() => dispatch(fetchRequiredInfo())}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (errorStatus) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Network Connection Failed!</Text>
        <Pressable
          onPress={() => dispatch(fetchProducts())}
          style={styles.btnError}
        >
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const onPressToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const onSelectHandler = (categoryId: string) => {
    setSelect(categoryId);
  };

  const onPressBottom = () => {
    scrollRef.current?.scrollTo({
      y: height,
      animated: true,
    });
  };

  const saveProductToRedux = (id: string, name: string) => {
    router.push({
      pathname: "/coffee/detail",
      params: { id, name }, // Data passed as query parameters
    });
  };

  const addToFavourite = async (item: ProductType) => {
    try {
      const data = { id: item.id, data: { favourite: !item.favourite } };
      // const data = { id: "uuid1", data: { favourite: !item.favourite } };
      await dispatch(updateFavouriteApi(data)).unwrap();
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
      <View
        style={[
          styles.navContainer,
          {
            borderBottomColor: currentTheme.colors.border,
            backgroundColor: currentTheme.colors.background,
          },
        ]}
      >
        <Pressable onPress={onPressToTop}>
          <Image
            style={styles.image}
            source={require("@/assets/images/CoffeeShot logo.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Pressable onPress={() => router.navigate("/coffee/(order)")}>
          <Cart />
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          <View>
            <View style={[styles.topContainer]}>
              <View>
                <Text variant="titleB">Good Morning!</Text>
                {!session ? (
                  <Text variant="textA">Login and get free ☕️</Text>
                ) : (
                  <>
                    <Text variant="textA">Welcome Auth User</Text>
                    <LogoutButton />
                  </>
                )}
              </View>
              <Image
                style={[
                  styles.imagePng,
                  {
                    borderColor: color.border,
                    borderWidth: 2,
                    borderRadius: 40,
                  },
                ]}
                source={require("@/assets/images/PNG image.png")}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>

            {!session ? (
              <View style={{ marginHorizontal: 5 }}>
                <Box backgroundColor="primary" style={styles.top2Container}>
                  <Text style={{ color: color.background, fontSize: 20 }}>
                    Join the Rewards program to enjoy free beverages, special
                    offers and more!
                  </Text>

                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={[
                        styles.button,
                        { backgroundColor: color.secondary },
                      ]}
                    >
                      <Text
                        style={{ color: color.background, fontWeight: "500" }}
                      >
                        JOIN NOW
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.button,
                        { backgroundColor: color.background },
                      ]}
                    >
                      <Text style={{ color: color.text, fontWeight: "500" }}>
                        GUEST ORDER
                      </Text>
                    </Pressable>
                  </View>
                </Box>
                <View
                  style={[
                    styles.top3Container,
                    { backgroundColor: color.background },
                  ]}
                >
                  <Pressable>
                    <Text
                      style={{
                        color: color.text,
                        fontSize: 17,
                        fontWeight: "500",
                      }}
                    >
                      Already have an account?
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.loginBtn}
                    onPress={() => router.navigate("/(auth)/login")}
                  >
                    <Text style={[styles.text, { color: color.primary }]}>
                      Login
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>

          {/* <Title title="Drinks" action="See All" onPressAction={onPressToTop} />
          <FlashList
            data={categories}
            horizontal
            renderItem={({ item }) => (
              <Category {...item} onSelect={onSelectHandler} select={select} />
            )}
            estimatedItemSize={80}
            showsHorizontalScrollIndicator={false}
          /> */}

          <View>
            <Title
              title="Drinks"
              action="See All"
              onPressAction={onPressBottom}
            />
          </View>

          <FlashList
            data={products}
            numColumns={2}
            contentContainerStyle={{
              paddingVertical: 10, // Add vertical padding
            }}
            renderItem={({ item }) => (
              <Product 
                {...item}
                onCall={() => saveProductToRedux(item.id, item.name)}
                onAdd={() => addToFavourite(item)}
              />
            )}
            estimatedItemSize={80}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{ marginBottom: 200 }}></View>
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
    alignItems: "center",
    marginBottom: 2,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 1, // Elevation for Android (increased for more emphasis)
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1, // Optional: add a bottom border for more definition
  },

  image: {
    width: 30,
    height: 50,
    resizeMode: "cover",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imagePng: {
    width:80,
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 15,
  },

  button: {
    width: width / 3,
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
