// src/api/ApiService.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store"; // Ensure SecureStore is imported
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ApiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
    prepareHeaders: async (headers) => {
      try {
        // Retrieve the session token from SecureStore
        const token = await SecureStore.getItemAsync("session");
        
        // Retrieve the language from AsyncStorage
        const language = await AsyncStorage.getItem('language');

        // Log the retrieved language
        console.log("Retrieved language from AsyncStorage:", language);

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          console.log("Token retrieved successfully:", token);
        } else {
          console.warn("No session token found in SecureStore");
        }

        if (language) {
          headers.set("Accept-Language", language); // Set the language header
          console.log("Language set to:", language);
        }

      } catch (error) {
        console.error("Error retrieving token or language:", error);
      }

      return headers;
    },
    credentials: "include",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["user"],
  endpoints: (builder) => ({}),
});
