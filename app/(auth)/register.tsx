import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import HookFormInput from "@/components/form/HookFormInput.component";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { useSession } from "@/providers/SessionProvider";

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  confirmPassword: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Passwords do not match",
    }),
});

type FormFields = z.infer<typeof formSchema>;

const Register = () => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const { signUp } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormFields) => {
    try {
      setLoading(true);
      await signUp(data.name, data.email, data.password);
      setErrorMessage(null);
      router.replace("/(protected)/"); // Redirect after successful registration
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={currentTheme.colors.primary}
        style={styles.spinner}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.container,
          { backgroundColor: currentTheme.colors.background },
        ]}
      >
        <HookFormInput
          control={control}
          name="name"
          label="User Name"
          placeholder="user123"
          inputMode="text"
          errorMessage={errors.name?.message}
          textColor={currentTheme.colors.text}
          placeholderColor={currentTheme.colors.placeholder}
        />

        <HookFormInput
          control={control}
          name="email"
          label="Email Address"
          placeholder="hello@gmail.com"
          inputMode="email"
          errorMessage={errors.email?.message}
          textColor={currentTheme.colors.text}
          placeholderColor={currentTheme.colors.placeholder}
        />

        <HookFormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          inputMode="password"
          errorMessage={errors.password?.message}
          textColor={currentTheme.colors.text}
          placeholderColor={currentTheme.colors.placeholder}
        />

        <HookFormInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          inputMode="password"
          errorMessage={errors.confirmPassword?.message}
          textColor={currentTheme.colors.text}
          placeholderColor={currentTheme.colors.placeholder}
        />

        {errorMessage && (
          <Text
            style={[styles.errorText, { color: currentTheme.colors.danger }]}
          >
            {errorMessage}
          </Text>
        )}

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            styles.registerButton,
            { backgroundColor: currentTheme.colors.secondary },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: currentTheme.colors.background },
            ]}
          >
            Register
          </Text>
        </TouchableOpacity>

        {/* Text link for login */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          style={styles.loginLink}
        >
          <Text style={{ color: currentTheme.colors.text }}>
            Already have an account?{" "}
            <Text style={{ color: currentTheme.colors.primary }}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    height: "100%",
  },
  registerButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 10,
  },
  spinner: {
    marginTop: 0,
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
});
