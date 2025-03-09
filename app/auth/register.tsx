import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { selectTheme } from "@/config/themeSlice";
import { useRegisterMutation } from '@/api/authAPI';
import { View, Text, KeyboardAvoidingView, Platform, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

export default function register() {

    // Get the router Instance
    const router = useRouter();

    // Extract Theme from Redux store
    const theme = useSelector(selectTheme);

    // Initialize Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Destructure rtk hook
    const [registerMutation, { isLoading }] = useRegisterMutation();

    // Handle Form Submission
    async function handleSubmit() {

        const data = { name, email, password };

        // Prevent API request if fields are empty
        if (!name || !email || !password) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required!',
                text1Style: { fontSize: 15 },
                position: 'top'
            });

            return; // Stops function execution here!
        }


        try {
            const user = await registerMutation(data).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Registered Successfully!',
                text1Style: { fontSize: 15 },
                text2: 'Login To Continue',
                text2Style: { fontSize: 15 },
                position: 'top',
            }),
                router.replace("/auth/login");

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
            className={`flex-1 justify-center p-6 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>

            <View className='items-center mb-8'>
                <Image
                    className=' h-48 w-full'
                    source={require('../../assets/images/Rectangle19.png')}
                    resizeMode="contain"
                />
            </View>

            {/* Welcome Text */}
            <View className="items-center mb-8">
                <Text className={`font-bold text-4xl mt-6 ${theme === "dark" ? "text-white" : "text-black"}`}>Create An Account.</Text>
                <Text className={`text-center text-lg mt-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Create an Account so You can Explore all the Existing Jobs!
                </Text>
            </View>


            {/* Input Fields */}
            <View className="space-y-6">
                {/* Name Input */}
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={theme === "dark" ? "#bbb" : "#666"}
                    style={{
                        borderBottomWidth: 2,
                        borderColor: theme === "dark" ? "#bbb" : "#666",
                        padding: 12,
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 18,
                        color: theme === "dark" ? "#fff" : "#000",
                    }}
                    keyboardType="default"
                    autoCapitalize="none"
                    value={name}
                    onChangeText={setName}
                />

                {/* Email Input */}
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme === "dark" ? "#bbb" : "#666"}
                    style={{
                        borderBottomWidth: 2,
                        borderColor: theme === "dark" ? "#bbb" : "#666",
                        padding: 12,
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 18,
                        color: theme === "dark" ? "#fff" : "#000",
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Password Input */}
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor={theme === "dark" ? "#bbb" : "#666"}
                    style={{
                        borderBottomWidth: 2,
                        borderColor: theme === "dark" ? "#bbb" : "#666",
                        padding: 12,
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 18,
                        color: theme === "dark" ? "#fff" : "#000",
                    }}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>


            <View className='flex flex-row my-6'>
                <TouchableOpacity className="flex-1 bg-blue-600 p-4 rounded-lg mx-4" onPress={handleSubmit}>
                    {isLoading ? <ActivityIndicator color="white" /> : <Text className="text-white text-center font-semibold">Sign Up</Text>}
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => router.push("/auth/login")} >
                    <Text className={`text-center mt-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Alreay have an Account?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}