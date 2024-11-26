import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from '@react-navigation/elements';
import {View} from 'react-native';
import AllWallpapersTab from './tabs/AllWallpapersTab';
import CategoryTab from './tabs/CategoryTab';
import CategoryStackNavigator from './CategoryStackNavigator';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Wallpapers" component={AllWallpapersTab} />
      <Tab.Screen name="Category" component={CategoryStackNavigator} />
      <Tab.Screen name="Favourlte" component={FavourlteTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const FavourlteTab = () => {
  return (
    <View>
      <Text>Favourlte Tab</Text>
    </View>
  );
};
