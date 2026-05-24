import { Appearance, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useEffect, useMemo } from "react";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "expo-router/react-navigation";
import { setTheme, selectTheme } from "@/config/themeSlice";
import { useSelector, useDispatch } from "react-redux";

type ThemeType = "light" | "dark";

const TAB_BACKGROUND = {
    dark: "#171827",
    light: "#ffffff",
} as const;

export default function Layout() {
    const theme = useSelector(selectTheme) as ThemeType;
    const dispatch = useDispatch();
    const isDark = theme === "dark";
    const statusBarStyle = isDark ? "light" : "dark";
    const backgroundColor = isDark ? TAB_BACKGROUND.dark : TAB_BACKGROUND.light;
    const activeTint = isDark ? "#3B82F6" : "#5363df";
    const inactiveTint = isDark ? "#9ca3af" : "#6b7280";

    const navigationTheme = useMemo(
        () =>
            isDark
                ? {
                      ...DarkTheme,
                      colors: {
                          ...DarkTheme.colors,
                          primary: activeTint,
                          background: TAB_BACKGROUND.dark,
                          card: TAB_BACKGROUND.dark,
                          border: "#2d3148",
                          text: "#ffffff",
                      },
                  }
                : {
                      ...DefaultTheme,
                      colors: {
                          ...DefaultTheme.colors,
                          primary: activeTint,
                          background: TAB_BACKGROUND.light,
                          card: TAB_BACKGROUND.light,
                          text: "#111827",
                      },
                  },
        [isDark, activeTint]
    );

    useEffect(() => {
        SystemUI.setBackgroundColorAsync(backgroundColor);
    }, [backgroundColor]);

    useEffect(() => {
        Appearance.setColorScheme(isDark ? "dark" : "light");
    }, [isDark]);

    useEffect(() => {
        const updateTheme = (preferences: Appearance.AppearancePreferences) => {
            dispatch(setTheme(preferences.colorScheme));
        };

        const subscription = Appearance.addChangeListener(updateTheme);

        return () => subscription.remove();
    }, [dispatch]);

    return (
        <ThemeProvider value={navigationTheme}>
            <StatusBar style={statusBarStyle} />

            <NativeTabs
                key={theme}
                tintColor={activeTint}
                iconColor={{ default: inactiveTint, selected: activeTint }}
                labelStyle={{
                    default: { color: inactiveTint, fontSize: 12 },
                    selected: { color: activeTint, fontSize: 12 },
                }}
                backgroundColor={backgroundColor}
                blurEffect={
                    Platform.OS === "ios"
                        ? isDark
                            ? "systemChromeMaterialDark"
                            : "systemChromeMaterialLight"
                        : undefined
                }
            >
                <NativeTabs.Trigger
                    name="index"
                    contentStyle={{ backgroundColor }}
                >
                    <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                    <NativeTabs.Trigger.Icon
                        sf={{ default: "house", selected: "house.fill" }}
                        md={{ default: "home", selected: "home" }}
                    />
                </NativeTabs.Trigger>

                <NativeTabs.Trigger
                    name="jobs"
                    contentStyle={{ backgroundColor }}
                >
                    <NativeTabs.Trigger.Label>Jobs</NativeTabs.Trigger.Label>
                    <NativeTabs.Trigger.Icon
                        sf={{ default: "briefcase", selected: "briefcase.fill" }}
                        md={{ default: "work", selected: "work" }}
                    />
                </NativeTabs.Trigger>

                <NativeTabs.Trigger
                    name="profile"
                    contentStyle={{ backgroundColor }}
                >
                    <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
                    <NativeTabs.Trigger.Icon
                        sf={{ default: "person.circle", selected: "person.circle.fill" }}
                        md={{ default: "person", selected: "person" }}
                    />
                </NativeTabs.Trigger>
            </NativeTabs>
        </ThemeProvider>
    );
}
