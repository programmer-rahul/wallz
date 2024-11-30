import {Pressable} from 'react-native';
import RenderImage from './RenderImage';
import WallpaperLikeBtn from './WallpaperLikeBtn';
import {View} from 'lucide-react-native';
import useAxios from '../hooks/useAxios';
import {useWallpaper} from '../context/WallpaperContext';

const WallpaperListItem = ({
  url,
  onPress,
  id,
}: {
  url: string;
  onPress: () => void;
  id: string;
}) => {
  const {increaseWallpaperCount} = useWallpaper();

  return (
    <Pressable
      style={{
        aspectRatio: 9 / 16,
        flex: 1,
      }}
      onPress={() => {
        onPress();
        increaseWallpaperCount(id, 'view');
      }}>
      <RenderImage url={url} />
      <View style={{position: 'absolute', bottom: 4, right: 4}}>
        <WallpaperLikeBtn wallpaperId={id} hideOnUnlike />
      </View>
    </Pressable>
  );
};

export default WallpaperListItem;
