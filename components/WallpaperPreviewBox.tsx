import { View } from 'react-native';
import RenderImage from './RenderImage';

const WallpaperPreviewBox = ({ url }: { url: string }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 10,
        paddingTop: 10
      }}>
      <RenderImage url={url} />
    </View>
  );
};

export default WallpaperPreviewBox;
