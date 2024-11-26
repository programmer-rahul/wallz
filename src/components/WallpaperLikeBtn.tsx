import {useEffect, useState} from 'react';
import {Pressable, Text} from 'react-native';
import {useWallpaper} from '../context/WallpaperContext';
import {Heart} from 'lucide-react-native';

const WallpaperLikeBtn = ({
  wallpaperId,
  hideOnUnlike = false,
}: {
  wallpaperId: string;
  hideOnUnlike?: boolean;
}) => {
  const {likedWallpapers, setLikedWallpapers} = useWallpaper();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedWallpapers.some(id => id == wallpaperId));
  }, [wallpaperId]);

  return (
    <Pressable
      style={{
        display: hideOnUnlike && !isLiked ? 'none' : 'flex',
        flex: 0,
        alignSelf: 'center',
      }}
      onPress={() => {
        setIsLiked(prev => !prev);

        setLikedWallpapers(prev =>
          isLiked
            ? prev.filter(id => id !== wallpaperId)
            : [...prev, wallpaperId],
        );
      }}>
      <Text style={{fontSize: 25}}>
        <Heart
          size={28}
          color={'#e31b23'}
          fill={isLiked ? '#e31b23' : 'transparent'}
        />
      </Text>
    </Pressable>
  );
};

export default WallpaperLikeBtn;
