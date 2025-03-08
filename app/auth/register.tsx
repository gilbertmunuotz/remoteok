import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import { selectTheme } from "@/config/themeSlice";
import { View, Text, KeyboardAvoidingView, Platform, Image, TextInput, TouchableOpacity } from 'react-native'

export default function register() {

    // Get the router Instance
    const router = useRouter();

    // Extract Theme from Redux store
    const theme = useSelector(selectTheme);

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
                />
            </View>


            <View className='flex flex-row my-6'>
                <TouchableOpacity className="flex-1 bg-blue-600 p-4 rounded-lg mx-4">
                    <Text className="text-white text-center font-semibold">Sign Up</Text>
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