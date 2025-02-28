import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <div>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>This screen doesn't exist.</Text>
      </View>
      <Link href="/(tabs)">
        <Text>Go to home screen!</Text>
      </Link>
    </div>
  );
}
