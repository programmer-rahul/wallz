import WallpapersListing from "@/components/WallpapersListing"
import COLORS from "@/constants/COLORS"
import { View } from "react-native"

const HomeScreen = () => {

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <WallpapersListing category="all-wallpapers" />
        </View>)
}

export default HomeScreen