import WallpapersListing from '@/components/WallpapersListing'
import COLORS from '@/constants/COLORS'
import React from 'react'
import { View } from 'react-native'

const FavouriteScreen = () => {
    return (
        <View style={{ height: '100%', backgroundColor: COLORS.background }}>
            <WallpapersListing category="favourite" />
        </View>)
}

export default FavouriteScreen