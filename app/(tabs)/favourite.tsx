import { View } from 'react-native';
import WallpapersListing from '../../components/WallpapersListing';

const FavouriteScreen = () => {


    return (
        <View style={{ height: '100%', backgroundColor: '#bbbddd' }}>
            <WallpapersListing category="favourite" />
        </View>
    );
};

export default FavouriteScreen;
