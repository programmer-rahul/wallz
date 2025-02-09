import {View} from 'react-native';
import WallpapersListing from './WallpapersListing';
import {RouteProp} from '@react-navigation/native';
import {TCategoryTabStackParamList} from '../types/navigation';

type TCategoryWallpaperListingRouteProp = RouteProp<
  TCategoryTabStackParamList,
  'CategoryWallpaperListing'
>;

const CategoryWallpaperListing = ({
  route,
}: {
  route: TCategoryWallpaperListingRouteProp;
}) => {
  const {category} = route.params;
  return (
    <View style={{height: '100%', backgroundColor: '#bbbddd'}}>
      <WallpapersListing category={category} />
    </View>
  );
};

export default CategoryWallpaperListing;
