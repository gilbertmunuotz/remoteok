import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { user } from '@/config/authSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { deleteToken } from '@/utils/secureStore';
import { useLogoutMutation } from '@/api/authAPI';
import { logoutSuccess } from '@/config/authSlice';
import { UserData } from '@/Interfaces/interface';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'

export default function Profile() {

    const dispatch = useDispatch();
    const router = useRouter();
    const [logoutMutation, { isLoading }] = useLogoutMutation();

    const userInfo = useSelector(user) as UserData;
    console.log("Details:", userInfo?.name);

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
        <View>
            <Text className='text-3xl'>Welcome {userInfo?.name}</Text>

            <TouchableOpacity
                className="bg-blue-600 p-4 rounded-lg px-4"
                onPress={handleLogout}>

                {isLoading ? (
                    <ActivityIndicator size='small' color='white' />
                ) : (
                    <Text className="text-white text-center font-bold">Logout</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}