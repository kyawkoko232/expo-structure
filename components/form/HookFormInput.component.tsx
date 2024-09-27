import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  inputMode?: "text" | "numeric" | "email" | "tel" | "password";
  errorMessage?: string;
  color?: string;
}

const HookFormInput: React.FC<FormInputProps> = ({
  control,
  name,
  label,
  placeholder,
  inputMode = "text",
  errorMessage,
  color = "#000",
  ...restProps
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const isPassword = inputMode === "password";

  return (
    <View style={styles.container}>
    <Text {...restProps} style={[styles.label, { color }]}>  
      {label}
      </Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isPassword && !isPasswordVisible}
              autoCapitalize="none"
              keyboardType={
                inputMode === "numeric"
                  ? "numeric"
                  : inputMode === "email"
                  ? "email-address"
                  : "default"
              }
              placeholderTextColor="#9CA3AF" // Placeholder color
            />
          )}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
          >
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={24}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default HookFormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "500", // Slightly lighter weight for modern look
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8, // More rounded corners
    borderWidth: 1,
    borderColor: "#D1D5DB",
    shadowColor: "#000", // Shadow for elevation
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3, // Elevation for Android
    paddingHorizontal: 10, // Padding for better alignment
  },
  input: {
    flex: 1,
    paddingVertical: 12, // Increase vertical padding for better touch area
    fontSize: 16, // Slightly larger text for readability
    color: "#1F2937", // Dark gray text color
  },
  iconContainer: {
    padding: 8,
  },
  errorText: {
    marginTop: 4,
    fontSize: 15, // Slightly larger font size
    fontWeight: "500",
    color: "#EF4444",
  },
});
