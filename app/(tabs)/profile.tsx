import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { user } from '@/config/authSlice';
import { useDispatch } from 'react-redux';
import { Switch } from "react-native-switch";
import Toast from 'react-native-toast-message';
import Feather from '@expo/vector-icons/Feather';
import { deleteToken } from '@/utils/secureStore';
import { FontAwesome5 } from "@expo/vector-icons";
import { UserData } from '@/interfaces/interface';
import { useLogoutMutation } from '@/api/authAPI';
import { logoutSuccess } from '@/config/authSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { changeTheme, selectTheme } from "@/config/themeSlice";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'

export default function Profile() {

    const dispatch = useDispatch();
    const router = useRouter();
    const [logoutMutation, { isLoading }] = useLogoutMutation();

    const userInfo = useSelector(user) as UserData;

    // Extract Theme from Redux store
    const theme = useSelector(selectTheme);

    const isDarkMode = theme === "dark";

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
        { id: "1", title: "My Account", icon: <AntDesign size={24} name="user" color={theme === "dark" ? "white" : "black"} /> },
        { id: "2", title: "Face ID", icon: <MaterialCommunityIcons size={24} name="face-recognition" color={theme === "dark" ? "white" : "black"} /> },
        { id: "3", title: "Two-Factor Authentication", icon: <MaterialCommunityIcons size={24} name="two-factor-authentication" color={theme === "dark" ? "white" : "black"} /> },
        { id: "4", title: "Help & Support", icon: <MaterialIcons size={24} name="support-agent" color={theme === "dark" ? "white" : "black"} /> },
        { id: "5", title: "About App", icon: <Feather size={24} name="info" color={theme === "dark" ? "white" : "black"} /> },
    ];

    return (
        <View className="flex-1">
            {/* Background Theme */}
            <View className={`${theme === "dark" ? "bg-gray-900 h-full" : "bg-blue-600"} absolute top-0 left-0 right-0 h-3/4`} />

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
                        <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-2xl font-semibold`}>
                            {userInfo?.name || "User"}
                        </Text>
                        <Text className={`${theme === "dark" ? "text-white" : "text-gray-300"} opacity-90 text-lg`}>
                            {userInfo?.email}
                        </Text>
                    </View>

                    {/* Toggle Theme Button */}
                    <View className="ml-auto">
                        <Switch
                            value={isDarkMode}
                            onValueChange={() => dispatch(changeTheme())}
                            circleSize={30}
                            barHeight={30}
                            backgroundActive="#222"
                            backgroundInactive="#ccc"
                            circleActiveColor="#facc15"
                            circleInActiveColor="#374151"
                            renderInsideCircle={() => (
                                <FontAwesome5
                                    name={isDarkMode ? "moon" : "sun"}
                                    size={16}
                                    color={isDarkMode ? "white" : "yellow"}
                                />
                            )}
                        />
                    </View>
                </View>

                {/* White Background Section */}
                <View className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} rounded-t-2xl -mt-6 min-h-screen px-4`}>
                    <Text className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl font-bold mt-3`}>Profile Information</Text>
                    <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-700"} mt-2`}>More details about the user...</Text>

                    {/* Profile Options List */}
                    <View className="mt-4">
                        {profileOptions.map((item) => (
                            <TouchableOpacity key={item.id} className="flex-row items-center py-6 border-b border-gray-200">
                                <View className="mr-3">{item.icon}</View>
                                <Text className={`${theme === "dark" ? "text-white" : "text-gray-700"} text-lg`}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Logout Button */}
                    <View className="mt-12">
                        <TouchableOpacity
                            className={`${theme === "dark" ? "bg-blue-600" : "bg-blue-500"} py-4 rounded-lg`}
                            onPress={handleLogout}>
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