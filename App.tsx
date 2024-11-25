import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import WallpaperProvider from './src/context/WallpaperContext';

import RenderBottomSheet from './src/components/RenderBottomSheet';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar barStyle={'light-content'} />
      <WallpaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Preview" component={PreviewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </WallpaperProvider>

      {/* <RenderBottomSheet /> */}
    </SafeAreaView>
  );
}

export default App;
