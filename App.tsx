import {NavigationContainer} from '@react-navigation/native';
import {Button, SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import RTNDeviceWallpaper from 'react-native-device-wallpaper-manager/js/NativeDeviceWallpaper';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
}

export default App;
