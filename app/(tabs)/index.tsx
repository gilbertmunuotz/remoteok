import axios from "axios";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import getCurrentMonthYear from '@/utils/date';
import { ApiResponse, Job } from "@/Interfaces/interface";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function Index() {

    const router = useRouter();

    const currentDate = getCurrentMonthYear();

    const categories = ["Design", "Development", "Marketing", "Writing", "Data Science"];

    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get<ApiResponse>('https://remoteok.com/api');
                const jobsArray = Object.values(data);
                setJobs(jobsArray);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            };
        }
        fetchJobs();
    }, []);


    return (
        <SafeAreaView className="flex-1 bg-white px-4">
            <ScrollView showsVerticalScrollIndicator={false}>


                {/* Greetings */}
                <View className="mt-8">
                    <Text className="text-4xl font-bold text-gray-900">👋 Welcome to RemoteOK</Text>
                    <Text className="text-gray-600 text-2xl font-semibold">{currentDate}</Text>
                </View>


                {/* Hero Section  */}
                <View className='mt-6 p-6 bg-blue-300 rounded-xl shadow-md'>
                    <Text className="text-xl font-bold text-blue-900">Find Your Next Remote Job!</Text>
                    <Text className="text-gray-700 mt-2">Browse thousands of remote jobs across various fields.</Text>
                </View>


                {/* Job Categories  */}
                <Text className="text-lg font-semibold mt-6 mb-2">Popular Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row'>
                    {categories.map((category, index) => (
                        <View key={index} className='bg-gray-200 px-4 py-2 rounded-full mr-2'>
                            <Text className='text-gray-700'>{category}</Text>
                        </View>
                    ))}
                </ScrollView>


                {/* Company Logos  */}
                <View className="py-4">
                    <Text className="text-lg font-semibold mt-6 mb-2">🏢 Featured Companies</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }} className="flex-row px-4 space-x-5">
                        {jobs.map((job, index) => {
                            const jobKey = job.id ? job.id.toString() : `job-${index}`;

                            return (
                                <View key={jobKey} className="bg-white shadow-md rounded-xl p-4 w-52 h-52 flex items-center justify-center">
                                    {
                                        job.company_logo ? (
                                            <Image
                                                source={{ uri: job.company_logo }}
                                                className="w-24 h-24"
                                                resizeMode="contain"
                                            />
                                        ) : (
                                            <Text key={jobKey} className="text-center text-gray-600">{job.company}</Text>
                                        )}
                                </View>
                            )
                        })}

                    </ScrollView>
                </View>

                {/* Highest Paying  */}
                <View className="bg-gray-100 p-4 rounded-xl shadow-md mt-6">
                    <Text className="text-lg font-semibold my-4">💰 Top Paying Jobs</Text>
                    {jobs.filter((job) => job.salary_max).sort((a, b) => b.salary_max! - a.salary_max!).slice(0,3)
                        .map((job) => (
                            <TouchableOpacity
                                key={job.id}
                                className="bg-white shadow-md rounded-xl p-4 mb-3"
                                onPress={() => router.push(`/job/${job.id}`)}>
                                <View className="flex-row items-center">
                                    {job.company_logo && (
                                        <Image
                                            source={{ uri: job.company_logo }}
                                            className="w-12 h-12 rounded-lg mr-3"
                                            resizeMode="contain"
                                        />
                                    )}
                                    <View>
                                        <Text className="text-base font-semibold">{job.position}</Text>
                                        <Text className="text-gray-600">{job.company}</Text>
                                        <Text className="text-green-600 font-bold">💲 ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>


                {/* Explore Button */}
                <TouchableOpacity className="bg-blue-500 px-4 py-3 rounded-full mt-6" onPress={() => router.push('/jobs')}>
                    <Text className="text-white text-center text-lg font-semibold">Explore Jobs</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    );
}