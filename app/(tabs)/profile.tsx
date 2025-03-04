import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { user } from '@/config/authSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import Entypo from '@expo/vector-icons/Entypo';
import { deleteToken } from '@/utils/secureStore';
import { useLogoutMutation } from '@/api/authAPI';
import Feather from '@expo/vector-icons/Feather';
import { logoutSuccess } from '@/config/authSlice';
import { UserData } from '@/Interfaces/interface';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

    const profileOptions = [
        { id: "1", title: "My Account", icon: <AntDesign size={24} name="user" color="black" /> },
        { id: "2", title: "Face ID", icon: <Entypo size={24} name="lock" color="black" /> },
        { id: "3", title: "Two-Factor Authentication", icon: <FontAwesome5 size={24} name="bell" color="black" /> },
        { id: "4", title: "Help & Support", icon: <MaterialIcons size={24} name="support-agent" color="black" /> },
        { id: "5", title: "About App", icon: <Feather size={24} name="info" color="#black" /> },
    ];

    return (
        <View className="flex-1">
            {/* Blue Background (Fixed at the top) */}
            <View className="absolute top-0 left-0 right-0 h-3/4 bg-blue-600" />

            <ScrollView showsVerticalScrollIndicator={false} className="bg-transparent flex-1">
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
                <View className="bg-white rounded-t-2xl -mt-6 min-h-screen px-4">
                    <Text className="text-xl font-bold mt-3">Profile Information</Text>
                    <Text className="text-gray-700 mt-2">More details about the user...</Text>

                    {/* Profile Options List */}
                    <View className="mt-4">
                        {profileOptions.map((item) => (
                            <TouchableOpacity key={item.id} className="flex-row items-center py-6 border-b border-gray-200">
                                <View className="mr-3">{item.icon}</View>
                                <Text className="text-lg text-gray-700">{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Logout Button */}
                    <View className="mt-12">
                        <TouchableOpacity
                            className="bg-blue-500 py-4 rounded-lg" onPress={handleLogout}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text className="text-white text-center font-bold">Logout</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}