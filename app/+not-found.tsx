import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops Not Found!' }} />
      <View className='flex-1 items-center justify-center'>
        <Text className='text-2xl font-semibold'>This screen doesn't exist.</Text>
        <Link href="/(tabs)">
          <Text className='text-blue-500 text-lg'>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
