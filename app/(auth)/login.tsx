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

// Zod schema for validation
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type FormFields = z.infer<typeof formSchema>; // Infer the form field types

// Login.tsx
const Login = () => {
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
      router.replace("/(protected)/home");
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
      <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Link href={"/"}>Go To Main Root ("/")</Link>
        <HookFormInput
          control={control}
          name="email"
          label="Email Address"
          placeholder="kyawkyaw@gmail.com"
          inputMode="email"
          errorMessage={errors.email?.message}
        />
        <HookFormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          inputMode="password"
          errorMessage={errors.password?.message}
        />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  buttonContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  spinner: {
    marginTop: 0,
  },
});