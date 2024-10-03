import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import {
  onboardingSwiperData,
  onboardingSwiperDataType,
} from "@/constants/constants";

const OnBoardingScreen = () => {
  const renderItem = ({ item }: { item: onboardingSwiperDataType }) => (
    <LinearGradient
      colors={["#F0D5AD", "#F8EBD8"]}
      style={styles.container}
    >
      <View style={styles.Container}>
        <View>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </LinearGradient>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        router.push("/(protected)/coffee/(tabs)");
      }}
      onSkip={() => {
        router.push("/(protected)/coffee/(tabs)");
      }}
      renderNextButton={() => (
        <View style={styles.buttonContainer}>
          <Text style={styles.ScrollButtonText}>Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.buttonContainer}>
          <Text style={styles.ScrollButtonText}>Done</Text>
        </View>
      )}
      showSkipButton={true}
      dotStyle={styles.dotStyle}
      bottomButton={true}
      showPrevButton={false}
      activeDotStyle={styles.activeDotStyle}
      skipLabel={<Text style={{ color: "#3C3C3C" }}>Skip</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  dotStyle: {
    backgroundColor: "#B0BEC5",
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1.25),
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: "#4B2C20",
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1.25),
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: "#4B2C20",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  ScrollButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OnBoardingScreen;
