import { useEffect } from 'react';
import { decode } from "html-entities";
import { useGetJobsQuery } from '@/api/jobAPI';
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

    useEffect(() => {
        // Set a custom header title dynamically
        navigation.setOptions({
            headerTitle: 'Job Details', // ✅ Change this to anything you want
            headerBackTitle: 'Back', // ✅ Ensures back button says "Back"
        });
    }, [navigation]);

    // Handle Loading State
    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 flex justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#007bff" />
                <Text className="text-gray-600 mt-4">Fetching job...</Text>
            </SafeAreaView>
        );
    }

    // Handle Error State
    if (isError || !job) {
        return (
            <SafeAreaView className="flex-1 flex justify-center items-center bg-white">
                <Text className="text-red-500 text-lg">Job Not Found. Please try again later.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
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
                        <Text className="text-gray-500">No Logo Available</Text>
                    )}
                </View>

                {/* Job Info */}
                <View className='px-4'>
                    <Text className="text-2xl font-bold">{job?.position}</Text>
                    <Text className="text-lg text-gray-600">{job?.company}</Text>
                    <Text className="text-gray-500 font-bold mb-2">{job?.location || 'Remote'}</Text>


                    {/* Salary */}
                    {job?.salary_min && job.salary_max && (
                        <Text className="text-green-600 font-bold mt-2">
                            💲 {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                        </Text>
                    )}

                    {/* Job Description */}
                    <View className='mt-4'>
                        <RenderHtml
                            contentWidth={width - 32}
                            source={{ html: decode(job?.description! || '') }}
                            tagsStyles={{
                                p: { paddingLeft: 5 },
                                ul: { paddingLeft: 5 },
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