import WallpapersListing from '@/components/WallpapersListing';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const CategoryWallpaperListing = () => {

  const { category } = useLocalSearchParams();

  return (
    <View style={{ height: '100%', backgroundColor: '#bbbddd' }}>
      <WallpapersListing category={category as string} />
    </View>
  );
};

export default CategoryWallpaperListing;
