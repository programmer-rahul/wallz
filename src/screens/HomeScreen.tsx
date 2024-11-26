import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import AllWallpapersTab from './tabs/AllWallpapersTab';
import CategoryStackNavigator from './CategoryStackNavigator';
import FavourlteTab from './tabs/FavouriteTab';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Wallpapers" component={AllWallpapersTab} />
      <Tab.Screen name="Category" component={CategoryStackNavigator} />
      <Tab.Screen name="Favourlte" component={FavourlteTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
