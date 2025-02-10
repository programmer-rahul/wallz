import { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import { useWallpaper } from '../context/WallpaperContext';
import { Heart } from 'lucide-react-native';
import COLORS from '@/constants/COLORS';

const WallpaperLikeBtn = ({
  wallpaperId,
  hideOnUnlike = false,
}: {
  wallpaperId: string;
  hideOnUnlike?: boolean;
}) => {
  const { likedWallpapers, setLikedWallpapers } = useWallpaper();
  const [isLiked, setIsLiked] = useState(false);

  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    setIsLiked(likedWallpapers.some(id => id == wallpaperId));
  }, [wallpaperId]);

  return (
    <Pressable
      style={[
        styles.pressable,
        { display: hideOnUnlike && !isLiked ? 'none' : 'flex' },
      ]}
      onPress={() => {
        setIsLiked(prev => !prev);

        setLikedWallpapers(prev =>
          isLiked
            ? prev.filter(id => id !== wallpaperId)
            : [...prev, wallpaperId],
        );

        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }}>
      <Text style={styles.text}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Heart
            size={28}
            color={COLORS.heart}
            fill={isLiked ? COLORS.heart : 'transparent'}
          />
        </Animated.View >
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 0,
    alignSelf: 'center',
  },
  text: {
    fontSize: 25,
  },
});

export default WallpaperLikeBtn;
