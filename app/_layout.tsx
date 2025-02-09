import WallpaperProvider from '@/context/WallpaperContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <WallpaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="preview" options={{ title: "Preview", headerShown: false }} />
      </Stack>
    </WallpaperProvider>
  );
}
