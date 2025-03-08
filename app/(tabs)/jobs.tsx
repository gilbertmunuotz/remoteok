import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import { useGetJobsQuery } from '@/api/jobAPI';
import { selectTheme } from "@/config/themeSlice";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'

export default function Jobs() {

    // Access the router Instance
    const router = useRouter();

    // Extract Theme from Redux store
    const theme = useSelector(selectTheme);

    // Destructure rtk Hook
    const { data: jobs, isLoading, isError } = useGetJobsQuery();

    // Handle Loading State
    if (isLoading) {
        return (
            <SafeAreaView className={`${theme === "dark" ? "bg-black" : "bg-white"} flex-1 flex justify-center items-center`}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-4`}>Fetching jobs...</Text>
            </SafeAreaView>
        );
    }

    // Handle Error State
    if (isError) {
        return (
            <SafeAreaView className={`${theme === "dark" ? "bg-black" : "bg-white"} flex-1 flex justify-center items-center`}>
                <Text className="text-red-500 text-lg">Failed to load jobs. Please try again later.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
            <FlatList
                data={jobs}
                keyExtractor={(item, index) => (item.id ? String(item.id) : `job-${index}`)}
                contentContainerStyle={{ backgroundColor: theme === "dark" ? "#000" : "#fff", paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/job/${item.id}`)} className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} shadow-md rounded-md px-4 mx-4 mb-4`}>
                        {item.company_logo && (
                            <Image source={{ uri: item.company_logo }} className='w-52 h-52 mt-3' resizeMode='contain' />
                        )}
                        <View>
                            <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold text-2xl`}>
                                {item.position}
                            </Text>
                            <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-700"} text-lg font-semibold`}>
                                {item.company}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}