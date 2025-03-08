import { useEffect } from "react";
import { Appearance } from "react-native";
import { StatusBar } from "expo-status-bar";
import { setTheme } from "@/config/themeSlice";
import { selectTheme } from "@/config/themeSlice";
import BottomTabNav from "@/components/BottomTabNav"
import { useSelector, useDispatch } from "react-redux";

export default function _layout() {

    // Define custom ThemeType
    type ThemeType = "light" | "dark";

    // Extract Theme from Redux store
    const theme = useSelector(selectTheme) as ThemeType;

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
            {/*  Use the reusable tab navigation and Pass theme as prop */}
            <BottomTabNav theme={theme} />
        </>
    );
}