import WallpapersListing from '@/components/WallpapersListing';
import COLORS from '@/constants/COLORS';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const CategoryWallpaperListing = () => {
  const { category } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <WallpapersListing category={category as string} />
    </View>
  );
};

export default CategoryWallpaperListing;
