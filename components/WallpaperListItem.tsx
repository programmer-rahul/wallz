// filepath: /home/pain/Documents/Setups/wallz-expo/components/WallpaperListItem.tsx
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useWallpaper } from '../context/WallpaperContext';
import RenderImage from './RenderImage';
import WallpaperLikeBtn from './WallpaperLikeBtn';
import { LinearGradient } from 'expo-linear-gradient';
import CardItemSkeltonLoader from './CardItemSkeltonLoader';

const WallpaperListItem = ({
  url,
  onPress,
  id,
}: {
  url: string;
  onPress: () => void;
  id: string;
}) => {
  const { increaseWallpaperCount } = useWallpaper();
  const [loading, setLoading] = useState(true);

  return (
    <Pressable
      style={{
        flex: 1,
        aspectRatio: 9 / 16,
        borderRadius: 12,
        position: "relative"
      }}
      onPress={() => {
        onPress();
        increaseWallpaperCount(id, 'view');
      }}>
      <RenderImage url={url} onLoad={() => { setLoading(false) }} />
      {/* Gradient Overlay */}
      {
        !loading && <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: "45%",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }} />
      }
      <View
        style={{
          position: 'absolute',
          bottom: 4,
          right: 4,
          backgroundColor: 'transparent',
        }}>
        <WallpaperLikeBtn wallpaperId={id} hideOnUnlike />
      </View>
    </Pressable>
  );
};

export default WallpaperListItem;