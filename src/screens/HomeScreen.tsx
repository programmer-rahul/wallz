import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllWallpapersTab from './tabs/AllWallpapersTab';
import CategoryStackNavigator from './CategoryStackNavigator';
import FavourlteTab from './tabs/FavouriteTab';
import {Heart, Layers2, LayoutGrid} from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6666aa',
        tabBarInactiveTintColor: '#666666',
      }}>
      <Tab.Screen
        name="Wallpapers"
        component={AllWallpapersTab}
        options={{
          tabBarIcon: ({focused}) => (
            <Layers2
              size={22}
              color={focused ? '#6666aa' : '#666666'}
              fill={focused ? '#6666aabb' : 'transparent'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <LayoutGrid
              size={22}
              color={focused ? '#6666aa' : '#666666'}
              fill={focused ? '#6666aabb' : 'transparent'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourlte"
        component={FavourlteTab}
        options={{
          tabBarIcon: ({focused}) => (
            <Heart
              size={22}
              color={focused ? '#6666aa' : '#666666'}
              fill={focused ? '#6666aabb' : 'transparent'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
