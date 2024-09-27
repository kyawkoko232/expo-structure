import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const onToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Open Drawer" onPress={onToggle}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
