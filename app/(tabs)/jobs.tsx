import { useRouter } from 'expo-router';
import { useGetJobsQuery } from '@/api/jobAPI';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'

export default function Jobs() {

    // Access the router Instance
    const router = useRouter();

    // Destructure rtk Hook
    const { data: jobs, isLoading, isError } = useGetJobsQuery();

    // Handle Loading State
    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 flex justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#007bff" />
                <Text className="text-gray-600 mt-4">Fetching jobs...</Text>
            </SafeAreaView>
        );
    }

    // Handle Error State
    if (isError) {
        return (
            <SafeAreaView className="flex-1 flex justify-center items-center bg-white">
                <Text className="text-red-500 text-lg">Failed to load jobs. Please try again later.</Text>
            </SafeAreaView>
        );
    }

    return (
        <FlatList
            data={jobs}
            keyExtractor={(item, index) => (item.id ? String(item.id) : `job-${index}`)}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => router.push(`/job/${item.id}`)} className='bg-white shadow-md rounded-md px-4 mx-4 mb-4'>
                    {item.company_logo && (
                        <Image source={{ uri: item.company_logo }} className='w-52 h-52 mt-3' resizeMode='contain' />
                    )}
                    <View>
                        <Text className='font-bold text-2xl'>{item.position}</Text>
                        <Text className='text-gray-700 text-lg font-semibold'>{item.company}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}