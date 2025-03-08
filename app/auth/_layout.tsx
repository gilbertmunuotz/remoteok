import { useEffect } from "react";
import { Stack } from "expo-router";
import { Appearance } from "react-native";
import { StatusBar } from "expo-status-bar";
import { setTheme } from "@/config/themeSlice";
import { selectTheme } from "@/config/themeSlice";
import { useSelector, useDispatch } from "react-redux";


export default function _layout() {

    // Extract Theme from Redux Store
    const theme = useSelector(selectTheme);

    // Get the dispatch Instance
    const dispatch = useDispatch();

    // Track Theme mode change
    useEffect(() => {
        // 🔥 Listen for system theme changes and update Redux state
        const updateTheme = (preferences: Appearance.AppearancePreferences) => {
            const newTheme = preferences.colorScheme; 
            dispatch(setTheme(newTheme));
        };

        const subscription = Appearance.addChangeListener(updateTheme);

        return () => subscription.remove(); // Cleanup on unmount
    }, [dispatch])

    return (
        <>
            {/* Apply status bar theme after the store is available */}
            <StatusBar
                style={theme === "dark" ? "light" : "dark"}
                backgroundColor="transparent"
                translucent={true}
            />

            <Stack>
                {/* Onboarding Screen */}
                <Stack.Screen name="index" options={{ headerShown: false }} />

                {/* Login Screen */}
                <Stack.Screen name="login" options={{ headerShown: false }} />

                {/* Register Screen */}
                <Stack.Screen name="register" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}