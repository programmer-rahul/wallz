import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from '@react-navigation/elements';
import {View} from 'react-native';
import AllWallpapersTab from './tabs/AllWallpapersTab';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="wallpapers" component={AllWallpapersTab} />
      <Tab.Screen name="category" component={CategoryTab} />
      <Tab.Screen name="favourite" component={FavouriteTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const CategoryTab = () => {
  return (
    <View>
      <Text>Category Tab</Text>
    </View>
  );
};

const FavouriteTab = () => {
  return (
    <View>
      <Text>Favourite Tab</Text>
    </View>
  );
};
