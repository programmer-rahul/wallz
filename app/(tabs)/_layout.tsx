import COLORS from '@/constants/COLORS';
import { Tabs } from 'expo-router';
import { Heart, Layers2, LayoutGrid } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.main,
            tabBarInactiveTintColor: COLORS.icon_neutral,
            tabBarStyle: {
                backgroundColor: COLORS.background,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Wallpapers",
                    tabBarIcon: ({ focused }) => (
                        <Layers2
                            size={22}
                            color={focused ? COLORS.main : COLORS.icon_neutral}
                            fill={focused ? COLORS.main + "aa" : 'transparent'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="category"
                options={{
                    title: "Category",
                    tabBarIcon: ({ focused }) => (
                        <LayoutGrid
                            size={22}
                            color={focused ? COLORS.main : COLORS.icon_neutral}
                            fill={focused ? COLORS.main + "aa" : 'transparent'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: "Favourite",
                    tabBarIcon: ({ focused }) => (
                        <Heart
                            size={22}
                            color={focused ? COLORS.main : COLORS.icon_neutral}
                            fill={focused ? COLORS.main + "aa" : 'transparent'}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
