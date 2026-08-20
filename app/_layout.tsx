import "../global.css";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { getToken } from "../utils/secureStore";
import { persistor, store } from "@/library/store";
import { View, ActivityIndicator } from "react-native";
import { PersistGate } from "redux-persist/integration/react";

// Temporary Solution
LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        await getToken();
      } catch (error) {
        console.error("Error checking auth", error);
      } finally {
        setIsLoading(false); // Always stop loading, whether or not a token exists
      }
    };

    checkAuth();
  }, []);

  // Handle Loading State
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="job/[id]" options={{ headerShown: true, title: "Job Details" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />

      </PersistGate>
    </Provider>
  )
}