import COLORS from '@/constants/COLORS';
import WallpaperProvider from '@/context/WallpaperContext';
import { Stack } from 'expo-router';
import { StatusBar, } from 'react-native';

export default function RootLayout() {
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
