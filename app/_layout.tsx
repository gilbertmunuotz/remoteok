import "../global.css";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Stack, Redirect } from "expo-router";
import Toast from "react-native-toast-message";
import { getToken } from "../utils/secureStore";
import { persistor, store } from "@/library/store";
import { PersistGate } from "redux-persist/integration/react";
import { useColorScheme, View, ActivityIndicator } from "react-native";

// ✅ Move LogBox.ignoreLogs outside the component function
LogBox.ignoreLogs([
  'Warning: TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'Warning: MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
  'Warning: TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = await getToken();
        setIsAuthenticated(!!token); // ✅ Cleaner way to set state
      } catch (error) {
        console.error("Error checking auth", error);
      } finally {
        setIsLoading(false); // Always stop loading, whether or not a token exists
      }
    };

    checkAuth();
  }, []);

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
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />


        {/* Redirect users based on authentication */}
        {isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/auth" />}

        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />

      </PersistGate>
    </Provider>
  )
}