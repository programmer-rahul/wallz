import COLORS from '@/constants/COLORS';
import { Tabs } from 'expo-router';
import { Heart, Layers2, LayoutGrid } from 'lucide-react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

export default function TabLayout() {

    // tabs navigation options 
    const tabsScreenOptions: BottomTabNavigationOptions = {
        headerShown: false,
        tabBarActiveTintColor: COLORS.main,
        tabBarInactiveTintColor: COLORS.icon_neutral,
        tabBarStyle: {
            backgroundColor: COLORS.background,
            height: 70,
        },
        tabBarLabelStyle: {
            fontFamily: 'Montserrat_500Medium',
        },
        tabBarIconStyle: {
            marginTop: 5,
        },
        tabBarLabel: ({ focused, color, children }) => (
            <Text style={{ fontFamily: focused ? 'Montserrat_700Bold' : 'Montserrat_500Medium', color, fontSize: 11 }}>
                {children}
            </Text>
        ),
    }

    // tabs icons
    const tabBarIcon = (icon: "wallpapers" | "category" | "favourite") => {
        const IconComponent = icon === "wallpapers" ? Layers2 :
            icon === "category" ? LayoutGrid :
                Heart;

        return ({ focused }: { focused: boolean }) => (
            <IconComponent
                size={22}
                color={focused ? COLORS.main : COLORS.icon_neutral}
                fill={focused ? COLORS.main + "aa" : 'transparent'}
            />
        );
    }

    return (
        <Tabs screenOptions={tabsScreenOptions}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Wallpapers",
                    tabBarIcon: tabBarIcon("wallpapers"),
                }}
            />
            <Tabs.Screen
                name="category"
                options={{
                    title: "Category",
                    tabBarIcon: tabBarIcon("category"),
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: "Favourite",
                    tabBarIcon: tabBarIcon("favourite"),
                }}
            />
        </Tabs>
    );
}
