import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack>
            {/* Onboarding Screen */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            {/* Login Screen */}
            <Stack.Screen name="login" options={{ headerShown: false }} />

            {/* Register Screen */}
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    )
}