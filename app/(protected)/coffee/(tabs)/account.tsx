import {
  View,
  Text,
  Modal,
  StyleSheet,
  Switch,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
// import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";
import { useSession } from "@/providers/SessionProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";
import { useTranslation } from "react-i18next";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { width, height } = Dimensions.get("window");

export default function Account() {
  const { currentTheme, changeTheme, getThemeKeys } = useTheme();

  const color = currentTheme.colors;
  const Text = createText<Theme>();
  const router = useRouter();
  const { signOut } = useSession();

  // Individual state for each switch
  const [is2FactorEnabled, setIs2FactorEnabled] = useState(false);
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(false);

  const toggle2Factor = () => setIs2FactorEnabled((prevState) => !prevState);
  const toggleFaceID = () => setIsFaceIDEnabled((prevState) => !prevState);
  const togglePasscode = () => setIsPasscodeEnabled((prevState) => !prevState);

  //theme
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

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
        style={{ paddingHorizontal: 25, marginTop: 15 }}
      >
        {/* profile */}
        <View>
          <Text variant="titleB">Profile</Text>
          <View style={{ marginVertical: 10, gap: 10 }}>
            <Pressable
              style={styles.container}
              onPress={() => {
                // router.push("/(auth)/login");
              }}
            >
              <Text variant="textA">Personal Info</Text>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="black"
              />
            </Pressable>

            <Pressable
              style={styles.container}
              onPress={() => {
                // router.push("/(auth)/login");
              }}
            >
              <Text variant="textA">Cards & Payments</Text>
              <Ionicons name="card-outline" size={24} color="black" />
            </Pressable>

            <Pressable
              style={styles.container}
              onPress={() => {
                // router.push("/(auth)/login");
              }}
            >
              <Text variant="textA">Transaction History</Text>
              <Ionicons name="options-outline" size={24} color="black" />
            </Pressable>

            <Pressable
              style={styles.container}
              onPress={() => {
                // router.push("/(auth)/login");
              }}
            >
              <Text variant="textA">Privacy & Data</Text>
              <Ionicons name="hand-left-outline" size={24} color="black" />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text variant="textA">Account ID</Text>
            <Pressable>
              <Ionicons name="id-card-outline" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        {/* Security */}
        <View style={{ marginTop: 10 }}>
          <Text variant="titleB">Security</Text>
          <View style={{ marginVertical: 10, gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text variant="textA">2-factor authentication</Text>
              <Switch
                trackColor={{
                  false: currentTheme.colors.disable,
                  true: currentTheme.colors.success,
                }}
                thumbColor={currentTheme.colors.accent}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggle2Factor}
                value={is2FactorEnabled}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text variant="textA">Face ID</Text>
              <Switch
                trackColor={{
                  false: currentTheme.colors.disable,
                  true: currentTheme.colors.success,
                }}
                thumbColor={currentTheme.colors.accent}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleFaceID}
                value={isFaceIDEnabled}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text variant="textA">Passcode Lock</Text>
              <Switch
                trackColor={{
                  false: currentTheme.colors.disable,
                  true: currentTheme.colors.success,
                }}
                thumbColor={currentTheme.colors.accent}
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglePasscode}
                value={isPasscodeEnabled}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text variant="titleB">Notification Preferences</Text>
          <View style={{ marginVertical: 10, gap: 10 }}></View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {getThemeKeys().map((themeKey) => (
                  <TouchableOpacity
                    key={themeKey}
                    style={[
                      styles.button,
                      currentTheme.name === themeKey && styles.buttonSelected,
                    ]}
                    onPress={() => {
                      changeTheme(themeKey);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.textStyle}>
                      {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text variant="textA">Themes</Text>
            {/* Update Text to reflect current theme */}
            <Text variant="paragraph">
              {currentTheme.name.charAt(0).toUpperCase() +
                currentTheme.name.slice(1)}
            </Text>
          </Pressable>
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

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    marginVertical: 5,
  },
  buttonSelected: {
    backgroundColor: "#FF5722", // Different color to indicate selected theme
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});
