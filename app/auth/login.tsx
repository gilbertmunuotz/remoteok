import { useState } from "react";
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { saveToken } from '@/utils/secureStore';
import Toast from 'react-native-toast-message';
import { useLoginMutation } from '@/api/authAPI';
import { loginSuccess } from "@/config/authSlice";
import { UserData } from "@/Interfaces/interface";
import { View, Text, KeyboardAvoidingView, Platform, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

export default function login() {

    // Instance of useRouter
    const router = useRouter();

    //Instance of useDispatch
    const dispatch = useDispatch();

    // Initialize Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login Mutation
    const [loginMutation, { isLoading }] = useLoginMutation();


    // Handle Form Submission
    async function handleSubmit() {

        const data: UserData = { email, password };

        // Prevent API request if fields are empty
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required!',
                text1Style: { fontSize: 15 },
                position: 'top'
            });

            return; // Stops function execution here!
        }


        try {
            const user = await loginMutation(data).unwrap();
            dispatch(loginSuccess(user));
            await saveToken(user.jwtToken)
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text1Style: { fontSize: 15 },
                position: 'top',
            }),
                router.replace("/(tabs)");

        } catch (error: any) {
            console.error("An error occured while logging in", error);

            // Extract the API error message
            const errorMessage = error?.data?.message || "Something went wrong. Please try again.";

            // Show error toast with extracted message
            Toast.show({
                type: "error",
                text1: errorMessage,
                position: "top",
            });
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className='flex-1 justify-center p-6'>

            <View className='items-center mb-8'>
                <Image
                    className='h-48 w-full'
                    source={require('../../assets/images/Rectangle19.png')}
                    resizeMode="contain"
                />
            </View>

            {/* Welcome Text */}
            <View className="items-center mb-8">
                <Text className="text-black font-bold text-4xl mt-6">Login Here.</Text>
                <Text className="text-center text-lg text-gray-600 mt-1">
                    Welcome Back! You've Been Missed!
                </Text>
            </View>


            {/* Input Fields */}
            <View className="space-y-6">
                {/* Email Input */}
                <TextInput
                    placeholder="Email"
                    className="border-b-2 border-gray-400 p-3 w-[85%] mx-auto text-lg"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Password Input */}
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    className="border-b-2 border-gray-400 p-3 w-[85%] mx-auto text-lg"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>


            <View className='flex flex-row my-6'>
                <TouchableOpacity className="flex-1 bg-blue-600 p-4 rounded-lg mx-4" onPress={handleSubmit}>
                    {isLoading ? <ActivityIndicator color="white" /> : <Text className="text-white text-center font-semibold">Sign In</Text>}
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => router.push("/auth/register")}>
                    <Text className='text-center mt-4 text-black'>Don't have an Account?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}