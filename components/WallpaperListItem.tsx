import { Pressable, View } from 'react-native';
import { useWallpaper } from '../context/WallpaperContext';
import RenderImage from './RenderImage';
import WallpaperLikeBtn from './WallpaperLikeBtn';
import COLORS from '@/constants/COLORS';

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

  return (
    <Pressable
      style={{
        flex: 1,
        aspectRatio: 9 / 16,
        borderRadius : 12
      }}
      onPress={() => {
        onPress();
        increaseWallpaperCount(id, 'view');
      }}>
      <RenderImage url={url} />
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
