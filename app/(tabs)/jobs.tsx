import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Jobs() {
    return (
        <SafeAreaView className='flex-1 bg-white px-4 mt-0'>
            <View className='mt-4'>
                <Text className='text-2xl font-semibold'>List of Available Jobs</Text>
            </View>
        </SafeAreaView>
    )
}