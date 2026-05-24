import { useEffect } from "react";
import { decode } from "html-entities";
import { useSelector } from "react-redux";
import { useGetJobsQuery } from "@/api/jobAPI";
import { selectTheme } from "@/config/themeSlice";
import RenderHtml from "react-native-render-html";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    formatJobDate,
    formatLocation,
    formatSalary,
    getCompanyAvatarColor,
    getCompanyInitials,
    getJobLogo,
} from "@/utils/job";
import {
    View,
    Text,
    Linking,
    useWindowDimensions,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";

export default function JobDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const theme = useSelector(selectTheme);
    const isDark = theme === "dark";
    const backgroundColor = isDark ? "#171827" : "#ffffff";

    const { data: jobs, isLoading, isError } = useGetJobsQuery();
    const job = jobs?.find((entry) => entry.id === id);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: job?.position ?? "Job Details",
            headerBackTitle: "Back",
            headerStyle: { backgroundColor },
            headerTintColor: isDark ? "#ffffff" : "#111827",
            headerShadowVisible: false,
        });
    }, [navigation, job?.position, backgroundColor, isDark]);

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor }} className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#5363df" />
                <Text className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-4`}>Loading role details...</Text>
            </SafeAreaView>
        );
    }

    if (isError || !job) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor }} className="flex-1 items-center justify-center px-6">
                <Feather name="alert-circle" size={40} color="#ef4444" />
                <Text className={`${isDark ? "text-white" : "text-gray-900"} mt-4 text-lg font-semibold`}>
                    Job not found
                </Text>
                <Text className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-2 text-center`}>
                    This listing may have been removed or is no longer available.
                </Text>
            </SafeAreaView>
        );
    }

    const logo = getJobLogo(job);
    const location = formatLocation(job.location);
    const salary = formatSalary(job.salary_min, job.salary_max);
    const posted = formatJobDate(job.date);
    const initials = getCompanyInitials(job.company);
    const avatarColor = getCompanyAvatarColor(job.company, isDark);
    const textColor = isDark ? "#f9fafb" : "#111827";
    const linkColor = isDark ? "#93c5fd" : "#5363df";

    return (
        <View style={{ flex: 1, backgroundColor }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                <View className={`px-5 pb-8 pt-4 ${isDark ? "bg-[#252842]" : "bg-indigo-600"}`}>
                    <View className="flex-row items-start">
                        {logo ? (
                            <View className="h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/95">
                                <Image source={{ uri: logo }} className="h-12 w-12" resizeMode="contain" />
                            </View>
                        ) : (
                            <View
                                style={{ backgroundColor: avatarColor }}
                                className="h-16 w-16 items-center justify-center rounded-2xl"
                            >
                                <Text className={`${isDark ? "text-white" : "text-gray-800"} text-xl font-bold`}>
                                    {initials || "?"}
                                </Text>
                            </View>
                        )}

                        <View className="ml-4 flex-1">
                            <Text className="text-2xl font-bold leading-8 text-white" numberOfLines={3}>
                                {job.position?.trim() || "Untitled role"}
                            </Text>
                            <Text className="mt-1 text-base font-medium text-white/80">
                                {job.company?.trim() || "Unknown company"}
                            </Text>
                        </View>
                    </View>

                    <View className="mt-5 flex-row flex-wrap gap-2">
                        <View className="flex-row items-center rounded-full bg-white/15 px-3 py-2">
                            <Feather name="map-pin" size={14} color="#ffffff" />
                            <Text className="ml-2 text-sm font-medium text-white">{location}</Text>
                        </View>
                        {posted && (
                            <View className="flex-row items-center rounded-full bg-white/15 px-3 py-2">
                                <Feather name="clock" size={14} color="#ffffff" />
                                <Text className="ml-2 text-sm font-medium text-white">{posted}</Text>
                            </View>
                        )}
                        {salary && (
                            <View className="flex-row items-center rounded-full bg-emerald-400/20 px-3 py-2">
                                <Feather name="dollar-sign" size={14} color="#bbf7d0" />
                                <Text className="ml-2 text-sm font-medium text-emerald-100">{salary}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View className={`relative -mt-5 rounded-t-3xl px-5 pt-6 ${isDark ? "bg-[#171827]" : "bg-white"}`}>
                    {Array.isArray(job.tags) && job.tags.length > 0 && (
                        <View className="mb-6">
                            <Text className={`${isDark ? "text-white" : "text-gray-900"} mb-3 text-lg font-bold`}>
                                Skills & focus
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <View
                                        key={`${job.id}-${tag}`}
                                        className={`rounded-full px-3 py-1.5 ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}
                                    >
                                        <Text className={`${isDark ? "text-blue-300" : "text-blue-700"} text-sm font-medium capitalize`}>
                                            {tag}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    <View className={`mb-6 rounded-2xl border p-4 ${isDark ? "border-gray-800 bg-[#1f2235]" : "border-gray-100 bg-gray-50"}`}>
                        <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs font-semibold uppercase tracking-wider`}>
                            Overview
                        </Text>
                        <View className="mt-3 gap-3">
                            <View className="flex-row items-center">
                                <Feather name="briefcase" size={16} color={linkColor} />
                                <Text className={`${isDark ? "text-gray-300" : "text-gray-700"} ml-3 flex-1 text-sm`}>
                                    {job.position?.trim() || "Untitled role"} at {job.company?.trim() || "Unknown company"}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Feather name="globe" size={16} color={linkColor} />
                                <Text className={`${isDark ? "text-gray-300" : "text-gray-700"} ml-3 flex-1 text-sm`}>
                                    {location}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Feather name="credit-card" size={16} color={linkColor} />
                                <Text className={`${isDark ? "text-gray-300" : "text-gray-700"} ml-3 flex-1 text-sm`}>
                                    {salary ?? "Compensation not listed"}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text className={`${isDark ? "text-white" : "text-gray-900"} mb-3 text-lg font-bold`}>
                            About this role
                        </Text>
                        <View className={`rounded-2xl border p-4 ${isDark ? "border-gray-800 bg-[#1f2235]" : "border-gray-100 bg-white"}`}>
                            <RenderHtml
                                contentWidth={width - 72}
                                source={{ html: decode(job.description || "<p>No description provided.</p>") }}
                                baseStyle={{
                                    color: textColor,
                                    fontSize: 15,
                                    lineHeight: 24,
                                }}
                                tagsStyles={{
                                    p: { marginBottom: 12, color: textColor, lineHeight: 24 },
                                    ul: { marginBottom: 12, paddingLeft: 8, color: textColor },
                                    ol: { marginBottom: 12, paddingLeft: 8, color: textColor },
                                    li: { marginBottom: 6, color: textColor, lineHeight: 22 },
                                    h1: { color: textColor, fontSize: 22, marginBottom: 12, fontWeight: "700" },
                                    h2: { color: textColor, fontSize: 20, marginBottom: 10, fontWeight: "700" },
                                    h3: { color: textColor, fontSize: 18, marginBottom: 8, fontWeight: "600" },
                                    strong: { color: textColor, fontWeight: "700" },
                                    span: { color: textColor },
                                    a: { color: linkColor, textDecorationLine: "underline" },
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <SafeAreaView
                edges={["bottom"]}
                className={`absolute bottom-0 left-0 right-0 border-t px-5 pt-3 ${isDark ? "border-gray-800 bg-[#171827]" : "border-gray-100 bg-white"}`}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    className={`rounded-2xl py-4 ${isDark ? "bg-blue-600" : "bg-indigo-600"}`}
                    onPress={() => Linking.openURL(job.apply_url)}
                >
                    <View className="flex-row items-center justify-center">
                        <Text className="text-center text-base font-bold text-white">Apply on RemoteOK</Text>
                        <Feather name="external-link" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}
