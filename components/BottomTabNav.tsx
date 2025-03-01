// Import npm packages
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Foundation } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Import all tab screens dynamically
import Index from "@/app/(tabs)/index";
import Jobs from "@/app/(tabs)/jobs";
import Profile from "@/app/(tabs)/profile";

// Create instance of tab navigator(createBottomTabNavigator)
const Tab = createBottomTabNavigator();


export default function BottomTabNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                        return <Foundation name={'home'} size={size} color={color} />;
                    } else if (route.name === 'Jobs') {
                        iconName = focused ? 'MaterialCommunityIcons' : 'MaterialCommunityIcons-outline';
                        return <MaterialCommunityIcons name={'post'} size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'circle' : 'circle-outline';
                        return <Entypo name={'circle'} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: '#5363df',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
                tabBarStyle: { paddingTop: 5, }
            })}
        >
            {/* Screen One */}
            <Tab.Screen
                name="Home"
                component={Index}
                options={{ headerShown: false }}
            />

            <Tab.Screen
                name="Jobs"
                component={Jobs}
                options={{ headerShown: false }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}