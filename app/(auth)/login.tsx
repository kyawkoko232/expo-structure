import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
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
      router.replace("/(protected)/");
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

  if (isLoading || loading) {
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
        <Link href={"/"}>Go To Main Root ("/")</Link>
        <HookFormInput
          control={control}
          name="email"
          label="Email Address"
          placeholder="kyawkyaw@gmail.com"
          inputMode="email"
          errorMessage={errors.email?.message}
          borderColor={currentTheme.colors.border} // Pass the border color from theme
          textColor={currentTheme.colors.text} // Optional: if you want to set text color
          placeholderColor={currentTheme.colors.placeholder} // Optional: if you want to set placeholder color
        />

        <HookFormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          inputMode="password"
          errorMessage={errors.password?.message}
          borderColor={currentTheme.colors.border} // Pass the border color from theme
          textColor={currentTheme.colors.text} // Optional
          placeholderColor={currentTheme.colors.placeholder} // Optional
        />
        {errorMessage && (
          <Text
            style={[styles.errorText, { color: currentTheme.colors.danger }]}
          >
            {errorMessage}
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: currentTheme.colors.primary },
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={[
              styles.loginButtonText,
              { color: currentTheme.colors.background },
            ]}
          >
            {t("auth.login")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    padding: 16,
    height: "100%",
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginTop: 10,
  },
  spinner: {
    marginTop: 0,
  },
});
