import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";
import { backgroundColor } from "@shopify/restyle";

const Pay = () => {
  const { currentTheme } = useTheme();
  const color = currentTheme.colors;
  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor: color.background,}}>
      <View
      >
        <Text style={[{ color: color.text }]}>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Pay;
