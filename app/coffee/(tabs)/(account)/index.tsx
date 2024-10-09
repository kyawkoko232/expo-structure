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
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";
import { useSession } from "@/providers/SessionProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
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

  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView
      style={{
        minHeight: height,
        backgroundColor: modalVisible ? color.disable : color.background,
        paddingHorizontal: 20,
      }}
    >
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

      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 25, marginTop: 15 }}
        >
          <View style={{ gap: 15 }}>
            {/* profile */}
            <View>
              <Text variant="titleB">Profile</Text>
              <View style={{ marginVertical: 5, gap: 3 }}>
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
                    color={currentTheme.colors.text}
                  />
                </Pressable>

                <Pressable
                  style={styles.container}
                  onPress={() => {
                    // router.push("/(auth)/login");
                  }}
                >
                  <Text variant="textA">Cards & Payments</Text>
                  <Ionicons name="card-outline" size={24} color={currentTheme.colors.text} />
                </Pressable>

                <Pressable
                  style={styles.container}
                  onPress={() => {
                    // router.push("/(auth)/login");
                  }}
                >
                  <Text variant="textA">Transaction History</Text>
                  <Ionicons name="options-outline" size={24} color={currentTheme.colors.text} />
                </Pressable>

                <Pressable
                  style={styles.container}
                  onPress={() => {
                    // router.push("/(auth)/login");
                  }}
                >
                  <Text variant="textA">Privacy & Data</Text>
                  <Ionicons name="hand-left-outline" size={24} color={currentTheme.colors.text} />
                </Pressable>
              </View>

              <Pressable
                style={styles.container}
                onPress={() => {
                  // router.push("/(auth)/login");
                }}
              >
                <Text variant="textA">Face ID</Text>
                <Ionicons name="id-card-outline" size={24} color={currentTheme.colors.text} />
              </Pressable>
            </View>

            {/* Security */}
            <View>
              <Text variant="titleB">Security</Text>
              <View style={{ marginVertical: 5, gap: 3 }}>
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

            <View>
              <Text variant="titleB">Notification Preferences</Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
              >
                <View style={styles.centeredView}>
                  <View
                    style={[
                      styles.modalView,
                      { backgroundColor: currentTheme.colors.background },
                    ]}
                  >
                    {getThemeKeys().map((themeKey) => (
                      <TouchableOpacity
                        key={themeKey}
                        style={[
                          styles.button,
                          currentTheme.name === themeKey && {
                            backgroundColor: currentTheme.colors.background,
                          },
                        ]}
                        onPress={() => {
                          changeTheme(themeKey);
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.textStyle,
                            { color: currentTheme.colors.text },
                          ]}
                        >
                          {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal>
              <Pressable onPress={() => setModalVisible(true)}>
                <Text variant="textA">Themes</Text>
                <Text variant="paragraph">
                  {currentTheme.name.charAt(0).toUpperCase() +
                    currentTheme.name.slice(1)}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
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
    marginVertical: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    borderRadius: 10,
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
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 10,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
