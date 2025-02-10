import { View } from 'react-native';
import RenderImage from './RenderImage';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const WallpaperPreviewBox = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
      }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <RenderImage url={url} onLoad={() => setIsLoading(false)} />
        {/* Gradient Overlay */}
        {
          !isLoading && <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: "45%",
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          />
        }
      </View>
    </View>
  );
};

export default WallpaperPreviewBox;
