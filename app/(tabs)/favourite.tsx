import { View } from 'react-native';
import WallpapersListing from '../../components/WallpapersListing';
import COLORS from '@/constants/COLORS';

const FavouriteScreen = () => {
    return (
        <View style={{ height: '100%', backgroundColor: COLORS.background }}>
            <WallpapersListing category="favourite" />
        </View>
    );
};

export default FavouriteScreen;
