import {Image, Pressable, Text, View} from 'react-native';
import {useWallpaper} from '../context/WallpaperContext';

const PreviewScreen = () => {
  const {selectedPreviewWallpaper} = useWallpaper();

  return selectedPreviewWallpaper ? (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#999999',
        flex: 1,
        flexDirection: 'column',
        rowGap: 20,
      }}>
      <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
        <View style={{flex: 1}}>
          <Text>{selectedPreviewWallpaper.title}</Text>
          <Text>Views : {selectedPreviewWallpaper.viewsCount}</Text>
        </View>
        <Pressable style={{flex: 0, alignSelf: 'center'}}>
          <Text style={{fontSize: 25}}>
            {selectedPreviewWallpaper.isLiked ? 'Liked' : 'Like'}
          </Text>
        </Pressable>
      </View>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: selectedPreviewWallpaper.uri,
          }}
          alt="image"
          resizeMode="cover"
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <WallpaperPreviewOption />
        <WallpaperPreviewOption />
        <WallpaperPreviewOption />
      </View>
    </View>
  ) : null;
};

export default PreviewScreen;

const WallpaperPreviewOption = () => {
  return (
    <View
      style={{
        width: '15%',
        aspectRatio: 1 / 1,
        backgroundColor: '#001394',
        borderRadius: '50%',
      }}></View>
  );
};
