// src/auth/useAuth.ts
import { useRouter } from "expo-router"; // Make sure to import useRouter
import { useSession } from "@/providers/SessionProvider"; // Adjust this to your actual session hook

const useAuth = () => {
  const router = useRouter();
  const { session, signOut } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut(); // Call the signOut method
      router.replace("/"); // Redirect to login page after sign-out
    } catch (error: any) {
      console.error("Error during sign-out:", error);

      // Log additional error details
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      
    }
  };

  return { handleSignOut, session }; // Return the signOut function and session if needed
};

export default useAuth;
