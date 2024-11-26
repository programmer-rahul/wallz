import {View} from 'react-native';
import WallpapersListing from '../../components/WallpapersListing';

const AllWallpapersTab = () => {
  return (
    <View style={{height: '100%'}}>
      <WallpapersListing category="Abstract" />
    </View>
  );
};

export default AllWallpapersTab;
