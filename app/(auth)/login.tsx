import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import HookFormInput from "@/components/form/HookFormInput.component";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@/providers/SessionProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";

// Zod schema for validation
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type FormFields = z.infer<typeof formSchema>;

const Login = () => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();
  const { signIn, session, isLoading } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (session) {
      router.replace("/(protected)/coffee/(home)/");
    }
  }, [session, router]);

  const onSubmit = async (data: FormFields) => {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading || loading ? (
        <ActivityIndicator
          size="large"
          color={currentTheme.colors.primary}
          style={styles.spinner}
        />
      ) : (
        <View
          style={[
            styles.container,
            { backgroundColor: currentTheme.colors.background },
          ]}
        >
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

          {errorMessage && (
            <Text
              style={[styles.errorText, { color: currentTheme.colors.danger }]}
            >
              {errorMessage}
            </Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[
              styles.loginButton,
              { backgroundColor: currentTheme.colors.secondary },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: currentTheme.colors.background },
              ]}
            >
              {t("auth.login")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
            style={styles.registerLink}
          >
            <Text style={{ color: currentTheme.colors.text }}>
              Don't have an account?{" "}
              <Text style={{ color: currentTheme.colors.primary }}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    height: "100%",
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
});
