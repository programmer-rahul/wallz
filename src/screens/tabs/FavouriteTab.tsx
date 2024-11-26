import {View} from 'react-native';
import WallpapersListing from '../../components/WallpapersListing';

const FavouriteTab = () => {
  return (
    <View style={{height: '100%'}}>
      <WallpapersListing category="favourite" />
    </View>
  );
};

export default FavouriteTab;
