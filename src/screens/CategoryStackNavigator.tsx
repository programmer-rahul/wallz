import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoryTab from './tabs/CategoryTab';
import CategoryWallpaperListing from '../components/CategoryWallpaperListing';
import {TCategoryTabStackParamList} from '../types/navigation';

const CategoryStack = createNativeStackNavigator<TCategoryTabStackParamList>();

const CategoryStackNavigator = () => {
  return (
    <CategoryStack.Navigator screenOptions={{headerShown: false}}>
      <CategoryStack.Screen name="CategoryMain" component={CategoryTab} />
      <CategoryStack.Screen
        name="CategoryWallpaperListing"
        component={CategoryWallpaperListing}
      />
    </CategoryStack.Navigator>
  );
};

export default CategoryStackNavigator;
