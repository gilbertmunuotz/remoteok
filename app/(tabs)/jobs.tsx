import { Job } from "@/interfaces/interface";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useGetJobsQuery } from "@/api/jobAPI";
import { selectTheme } from "@/config/themeSlice";
import Feather from "@expo/vector-icons/Feather";
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
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";

const MAX_TAGS = 3;

function CompanyAvatar({ job, isDark }: { job: Job; isDark: boolean }) {
    const logo = getJobLogo(job);
    const initials = getCompanyInitials(job.company);
    const avatarColor = getCompanyAvatarColor(job.company, isDark);

    if (logo) {
        return (
            <View className={`${isDark ? "bg-gray-800" : "bg-gray-100"} h-14 w-14 rounded-2xl items-center justify-center overflow-hidden`}>
                <Image source={{ uri: logo }} className="h-10 w-10" resizeMode="contain" />
            </View>
        );
    }

    return (
        <View
            style={{ backgroundColor: avatarColor }}
            className="h-14 w-14 rounded-2xl items-center justify-center"
        >
            <Text className={`${isDark ? "text-white" : "text-gray-800"} text-lg font-bold`}>
                {initials || "?"}
            </Text>
        </View>
    );
}

function JobListCard({ job, isDark, onPress }: { job: Job; isDark: boolean; onPress: () => void }) {
    const location = formatLocation(job.location);
    const salary = formatSalary(job.salary_min, job.salary_max);
    const posted = formatJobDate(job.date);
    const visibleTags = Array.isArray(job.tags) ? job.tags.slice(0, MAX_TAGS) : [];
    const hiddenTagCount = Math.max((Array.isArray(job.tags) ? job.tags.length : 0) - MAX_TAGS, 0);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            className={`mx-4 mb-4 rounded-2xl border p-4 ${
                isDark ? "border-gray-800 bg-[#1f2235]" : "border-gray-100 bg-white shadow-sm"
            }`}
        >
            <View className="flex-row items-start">
                <CompanyAvatar job={job} isDark={isDark} />
                <View className="ml-3 flex-1">
                    <Text
                        className={`${isDark ? "text-white" : "text-gray-900"} text-lg font-bold`}
                        numberOfLines={2}
                    >
                        {job.position?.trim() || "Untitled role"}
                    </Text>
                    <Text
                        className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-1 text-sm font-medium`}
                        numberOfLines={1}
                    >
                        {job.company?.trim() || "Unknown company"}
                    </Text>
                </View>
                <Feather name="chevron-right" size={20} color={isDark ? "#6b7280" : "#9ca3af"} />
            </View>

            <View className="mt-4 flex-row flex-wrap gap-2">
                <View className={`flex-row items-center rounded-full px-3 py-1.5 ${isDark ? "bg-gray-800/80" : "bg-gray-100"}`}>
                    <Feather name="map-pin" size={12} color={isDark ? "#93c5fd" : "#5363df"} />
                    <Text className={`${isDark ? "text-gray-300" : "text-gray-700"} ml-1.5 text-xs font-medium`}>
                        {location}
                    </Text>
                </View>

                {salary ? (
                    <View className={`flex-row items-center rounded-full px-3 py-1.5 ${isDark ? "bg-emerald-900/30" : "bg-emerald-50"}`}>
                        <Feather name="dollar-sign" size={12} color={isDark ? "#6ee7b7" : "#059669"} />
                        <Text className={`${isDark ? "text-emerald-300" : "text-emerald-700"} ml-1.5 text-xs font-medium`}>
                            {salary}
                        </Text>
                    </View>
                ) : (
                    <View className={`flex-row items-center rounded-full px-3 py-1.5 ${isDark ? "bg-gray-800/80" : "bg-gray-100"}`}>
                        <Feather name="briefcase" size={12} color={isDark ? "#9ca3af" : "#6b7280"} />
                        <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} ml-1.5 text-xs font-medium`}>
                            Open role
                        </Text>
                    </View>
                )}
            </View>

            {visibleTags.length > 0 && (
                <View className="mt-3 flex-row flex-wrap gap-2">
                    {visibleTags.map((tag) => (
                        <View
                            key={`${job.id}-${tag}`}
                            className={`rounded-full px-2.5 py-1 ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}
                        >
                            <Text className={`${isDark ? "text-blue-300" : "text-blue-700"} text-xs font-medium capitalize`}>
                                {tag}
                            </Text>
                        </View>
                    ))}
                    {hiddenTagCount > 0 && (
                        <View className={`rounded-full px-2.5 py-1 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                            <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs font-medium`}>
                                +{hiddenTagCount}
                            </Text>
                        </View>
                    )}
                </View>
            )}

            {posted && (
                <Text className={`${isDark ? "text-gray-500" : "text-gray-400"} mt-3 text-xs`}>
                    Posted {posted}
                </Text>
            )}
        </TouchableOpacity>
    );
}

export default function Jobs() {
    const router = useRouter();
    const theme = useSelector(selectTheme);
    const isDark = theme === "dark";
    const backgroundColor = isDark ? "#171827" : "#ffffff";
    const { data: jobs = [], isLoading, isError } = useGetJobsQuery();

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <SafeAreaView style={{ flex: 1, backgroundColor }} className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#5363df" />
                    <Text className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-4`}>Loading opportunities...</Text>
                </SafeAreaView>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <SafeAreaView style={{ flex: 1, backgroundColor }} className="flex-1 items-center justify-center px-6">
                    <Feather name="alert-circle" size={40} color="#ef4444" />
                    <Text className={`${isDark ? "text-white" : "text-gray-900"} mt-4 text-center text-lg font-semibold`}>
                        Couldn't load jobs
                    </Text>
                    <Text className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-2 text-center`}>
                        Please check your connection and try again.
                    </Text>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor }}>
            <SafeAreaView style={{ flex: 1, backgroundColor }} edges={["top", "left", "right"]}>
                <FlatList
                    data={jobs}
                    keyExtractor={(item, index) => (item.id ? String(item.id) : `job-${index}`)}
                    style={{ backgroundColor }}
                    contentContainerStyle={{ backgroundColor, paddingBottom: 24 }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View className="px-4 pb-2 pt-2">
                            <Text className={`${isDark ? "text-white" : "text-gray-900"} text-3xl font-bold`}>
                                Jobs
                            </Text>
                            <Text className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-1 text-base`}>
                                {jobs.length} remote {jobs.length === 1 ? "opening" : "openings"} available
                            </Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View className="mt-20 items-center px-6">
                            <Feather name="inbox" size={40} color={isDark ? "#6b7280" : "#9ca3af"} />
                            <Text className={`${isDark ? "text-white" : "text-gray-900"} mt-4 text-lg font-semibold`}>
                                No jobs found
                            </Text>
                            <Text className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-2 text-center`}>
                                Check back soon for new remote opportunities.
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <JobListCard
                            job={item}
                            isDark={isDark}
                            onPress={() => router.push(`/job/${item.id}`)}
                        />
                    )}
                />
            </SafeAreaView>
        </View>
    );
}
