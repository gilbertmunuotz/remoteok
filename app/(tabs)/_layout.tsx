import BottomTabNav from "@/components/BottomTabNav"
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { selectTheme } from "@/config/themeSlice";

export default function _layout() {

    // Define custom ThemeType
    type ThemeType = "light" | "dark";

    // Extract Theme from Redux store
    const theme = useSelector(selectTheme) as ThemeType;

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