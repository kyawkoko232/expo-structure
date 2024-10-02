import { useTheme } from "@shopify/restyle";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput, Text, View } from "react-native";

interface HookFormInputProps {
  control: any; // Replace with proper type for your control
  name: string;
  label: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "password"; // Define input modes as needed
  errorMessage?: string;
  borderColor?: string; // New prop for border color
  textColor?: string; // New prop for text color
  placeholderColor?: string; // New prop for placeholder color
}

const HookFormInput: React.FC<HookFormInputProps> = ({
  control,
  name,
  label,
  placeholder,
  inputMode = "text",
  errorMessage,
  borderColor,
  textColor,
  placeholderColor,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                borderColor: borderColor || theme.colors.border, // Use border color prop or fallback to theme
                color: textColor || theme.colors.text, // Use text color prop or fallback to theme
              },
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor || theme.colors.placeholder} // Use placeholder color prop or fallback to theme
            secureTextEntry={inputMode === "password"} // Conditionally render password input
            keyboardType={inputMode === "email" ? "email-address" : "default"}
          />
        )}
        name={name}
        rules={{ required: true }} // You can customize this as per your validation rules
      />
      {errorMessage && (
        <Text style={[styles.errorText, { color: theme.colors.danger }]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    marginTop: 4,
  },
});

export default HookFormInput;
