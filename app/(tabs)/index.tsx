import { View, } from 'react-native';
import WallpapersListing from '@/components/WallpapersListing';

export default function Index() {
  return (
    <View style={{ height: '100%', backgroundColor: '#bbbddd' }}>
      <WallpapersListing category="all-wallpapers" />
    </View>
  );
}
