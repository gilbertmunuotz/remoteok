import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function OnBOarding() {

    const router = useRouter();

    return (
        <View className="flex-1 justify-center items-center p-4">
            <View>
                <Image
                    className="h-1/2"
                    source={require("../../assets/images/onBoard.png")}
                    resizeMode="contain"
                />
            </View>


            <Text className="text-3xl text-blue-800">Discover Your Dream Job Here.</Text>
            <Text className="text-lg text-black mx-6 mt-1 text-center">
                Explore all the Existing jobs based on Your Interest and Study Major.
            </Text>

            {/* Button Row */}
            <View className="flex flex-row mt-6 space-x-4">
                <TouchableOpacity
                    className="flex-1 bg-blue-600 p-4 rounded-lg mx-4"
                    onPress={() => router.push("/auth/register")}>

                    <Text className="text-white text-center font-semibold">Get Started Now</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    className="flex-1 bg-white border border-gray-400 p-4 rounded-lg mx-4"
                    onPress={() => router.push("/auth/login")}>

                    <Text className="text-black text-center font-semibold">Already A User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}