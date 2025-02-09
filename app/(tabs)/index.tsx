import { View } from 'react-native';
import WallpapersListing from '@/components/WallpapersListing';
import COLORS from '@/constants/COLORS';

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <WallpapersListing category="all-wallpapers" />
    </View>
  );
}