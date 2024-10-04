import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { createText } from "@shopify/restyle";
import { Theme } from "@/theme/theme";



export type titleProps = {
  title: string;
  action: string;
  onPressAction?: () => void;
};

export default function Title({ title, action, onPressAction }: titleProps) {
  const { currentTheme } = useTheme();
  const Text = createText<Theme>();

  return (
    <View>
      <View style={styles.container}>
        <Text variant="titleB" >
          {title}
        </Text>
        <Pressable onPress={onPressAction}>
          <Text variant="link">
            {action}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  category: {
    fontSize: 20,
    fontWeight: "700",
  },
  action: {
    fontSize: 16,
    color: "blue", // Customize the action text style
  },
});
