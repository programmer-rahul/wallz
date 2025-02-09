import COLORS from '@/constants/COLORS';
import WallpaperProvider from '@/context/WallpaperContext';
import { Stack } from 'expo-router';
import { StatusBar, } from 'react-native';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

export default function RootLayout() {

  let [fontsLoaded] = useFonts({
    // Montserrat_100Thin,
    // Montserrat_200ExtraLight,
    // Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    // Montserrat_800ExtraBold,
    // Montserrat_900Black,
    // Montserrat_100Thin_Italic,
    // Montserrat_200ExtraLight_Italic,
    // Montserrat_300Light_Italic,
    // Montserrat_400Regular_Italic,
    // Montserrat_500Medium_Italic,
    // Montserrat_600SemiBold_Italic,
    // Montserrat_700Bold_Italic,
    // Montserrat_800ExtraBold_Italic,
    // Montserrat_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <WallpaperProvider>
      <StatusBar backgroundColor={COLORS.background} barStyle={'dark-content'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="preview" options={{ title: "Preview", headerShown: false }} />
      </Stack>
    </WallpaperProvider>

  );
}
