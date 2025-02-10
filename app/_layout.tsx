import COLORS from '@/constants/COLORS';
import WallpaperProvider from '@/context/WallpaperContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
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
