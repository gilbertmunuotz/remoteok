import { useEffect } from 'react';
import { decode } from "html-entities";
import { useSelector } from "react-redux";
import { useGetJobsQuery } from '@/api/jobAPI';
import { selectTheme } from "@/config/themeSlice";
import RenderHtml from "react-native-render-html";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, Linking, SafeAreaView, useWindowDimensions, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function JobDetails() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();

    // Fetch all jobs
    const { data: jobs, isLoading, isError } = useGetJobsQuery();

    // Find the job by ID
    const job = jobs?.find((j) => j.id === id);

    const { width } = useWindowDimensions(); // Get device width

    // Extract Theme from Redux store
    const theme = useSelector(selectTheme);

    useEffect(() => {
        // Set a custom header title dynamically
        navigation.setOptions({
            headerTitle: 'Job Details',
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: theme === "dark" ? "#171827" : "#ffffff",
            },
            headerTintColor: theme == "dark" ? "#fff" : "#000"
        });
    }, [navigation]);

    // Handle Loading State
    if (isLoading) {
        return (
            <SafeAreaView className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-4`}>Fetching job...</Text>
            </SafeAreaView>
        );
    }

    // Handle Error State
    if (isError || !job) {
        return (
            <SafeAreaView className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} flex-1 justify-center items-center`}>
                <Text className="text-red-500 text-lg">Job Not Found. Please try again later.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} flex-1`}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Company Logo */}
                <View className="items-center my-4">
                    {job?.company_logo ? (
                        <Image
                            source={{ uri: job.company_logo }}
                            style={{ width: width * 0.8, height: 150 }} // Adjusted for better UI
                            className='rounded-xl'
                            resizeMode="contain" />
                    ) : (
                        <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold text-2xl`}>No Logo Available</Text>
                    )}
                </View>

                {/* Job Info */}
                <View className="px-4">
                    <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold text-2xl`}>{job?.position}</Text>
                    <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-lg`}>{job?.company}</Text>
                    <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold mb-2`}>{job?.location || 'Remote'}</Text>

                    {/* Salary */}
                    {job?.salary_min && job.salary_max && (
                        <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold mt-2`}>
                            💲 {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                        </Text>
                    )}

                    {/* Job Description */}
                    <View className={`mt-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                        <RenderHtml
                            contentWidth={width - 32}
                            source={{ html: decode(job?.description || '') }}
                            tagsStyles={{
                                p: { paddingLeft: 5, color: theme === "dark" ? "white" : "black" },
                                ul: { paddingLeft: 5, color: theme === "dark" ? "white" : "black" },
                                h1: { color: theme === "dark" ? "white" : "black" },
                                li: { color: theme === "dark" ? "white" : "black" },
                                span: { color: theme === "dark" ? "white" : "black" },
                                a: { color: theme === "dark" ? '#4c9ee1' : '#007bff' },
                            }}
                        />
                    </View>


                    {/* Apply Button */}
                    <TouchableOpacity className="bg-blue-500 p-3 rounded-lg mt-6 mb-3" onPress={() => Linking.openURL(job?.apply_url!)}>
                        <Text className="text-white text-center text-lg font-semibold">Apply Now</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}