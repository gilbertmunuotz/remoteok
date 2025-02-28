import { useRouter } from 'expo-router'
import { View, Text, KeyboardAvoidingView, Platform, Image, TextInput, TouchableOpacity } from 'react-native'

export default function register() {

    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className='flex-1 justify-center p-6'>

            <View className='items-center mb-8'>
                <Image
                    className=' h-48 w-full'
                    source={require('../../assets/images/Rectangle19.png')}
                    resizeMode="contain"
                />
            </View>

            {/* Welcome Text */}
            <View className="items-center mb-8">
                <Text className="text-black font-bold text-4xl mt-6">Create An Account.</Text>
                <Text className="text-center text-lg text-gray-600 mt-1">
                    Create an Account so You can Explore all the Existing Jobs!
                </Text>
            </View>


            {/* Input Fields */}
            <View className="space-y-6">
                {/* Name Input */}
                <TextInput
                    placeholder="Name"
                    className="border-b-2 border-gray-400 p-3 w-[85%] mx-auto text-lg"
                    keyboardType="default"
                    autoCapitalize="none"
                />

                {/* Email Input */}
                <TextInput
                    placeholder="Email"
                    className="border-b-2 border-gray-400 p-3 w-[85%] mx-auto text-lg"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Password Input */}
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    className="border-b-2 border-gray-400 p-3 w-[85%] mx-auto text-lg"
                />
            </View>


            <View className='flex flex-row my-6'>
                <TouchableOpacity className="flex-1 bg-blue-600 p-4 rounded-lg mx-4">
                    <Text className="text-white text-center font-semibold">Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => router.push("/auth/login")} >
                    <Text className='text-center mt-4 text-black'>Alreay have an Account?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}