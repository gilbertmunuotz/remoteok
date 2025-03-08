import { selectTheme } from "@/config/themeSlice";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";


export default function _layout() {

    // Extract Theme from Redux Store
    const theme = useSelector(selectTheme);

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