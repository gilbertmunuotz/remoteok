import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { user } from '@/config/authSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { deleteToken } from '@/utils/secureStore';
import { useLogoutMutation } from '@/api/authAPI';
import { logoutSuccess } from '@/config/authSlice';
import { UserData } from '@/Interfaces/interface';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'

export default function Profile() {

    const dispatch = useDispatch();
    const router = useRouter();
    const [logoutMutation, { isLoading }] = useLogoutMutation();

    const userInfo = useSelector(user) as UserData;

    // Handle Logout Logic
    async function handleLogout() {
        try {
            await logoutMutation().unwrap();
            dispatch(logoutSuccess());
            await deleteToken();
            router.replace('/auth/login');
            Toast.show({
                text1: "Logout Successful",
                type: 'success',
                position: 'top',
            });
        } catch (error) {
            console.error("Error logging out:", error);
            Toast.show({
                text1: "Error logging out",
                type: 'error',
                position: 'top',
            });
        }
    }

    return (
        <View className="flex-1">
            {/* Blue Background (Fixed at the top) */}
            <View className="absolute top-0 left-0 right-0 h-3/4 bg-blue-600" />

            <ScrollView showsVerticalScrollIndicator={false} className="bg-transparent">
                {/* Hero Section */}
                <View className="p-10 flex-row items-center mt-12">
                    {/* Profile Image */}
                    <Image
                        source={{ uri: 'https://www.gravatar.com/avatar/?d=mp' }}
                        className="w-28 h-28 rounded-full border-2 border-white"
                        resizeMode="cover"
                    />

                    {/* User Details */}
                    <View className="ml-4">
                        <Text className="text-2xl font-semibold text-white">{userInfo?.name || "User"}</Text>
                        <Text className="text-white opacity-90 text-lg">{userInfo?.email}</Text>
                    </View>
                </View>

                {/* White Background Section */}
                <View className="bg-white rounded-t-2xl -mt-6 min-h-screen p-6">
                    <Text className="text-xl font-bold">Profile Information</Text>
                    <Text className="text-gray-700 mt-2">More details about the user...</Text>

                    <Text className="mt-4 text-3xl">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nobis possimus, ipsa fugit magni quia nulla accusantium cum impedit et totam velit autem obcaecati illum earum delectus nihil dolore cumque?
                    </Text>

                    <Text className="mt-4 text-3xl">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nobis possimus, ipsa fugit magni quia nulla accusantium cum impedit et totam velit autem obcaecati illum earum delectus nihil dolore cumque?
                    </Text>

                    {/* Logout Button */}
                    <TouchableOpacity
                        className="bg-blue-500 p-4 rounded-lg mt-6" onPress={handleLogout}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text className="text-white text-center font-bold">Logout</Text>
                        )}
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}