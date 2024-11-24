import {Image, Pressable, Text, View} from 'react-native';
import {useWallpaper} from '../context/WallpaperContext';
import PagerView from 'react-native-pager-view';
import {useState} from 'react';
import {TWallpaper} from '../types/wallpaper';

const PreviewScreen = () => {
  const {selectedPreviewWallpaper, wallpapersList} = useWallpaper();

  const [selectedPage, setSelectedPage] = useState(0);
  const [wallpapersListing, setWallpapersListing] =
    useState<TWallpaper[]>(wallpapersList);

  return selectedPreviewWallpaper ? (
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: '#999999',
        flex: 1,
        flexDirection: 'column',
        rowGap: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          paddingHorizontal: 20,
        }}>
        <View style={{flex: 1}}>
          <Text>{wallpapersListing[selectedPage].title}</Text>
          <Text>Views : {wallpapersListing[selectedPage].viewsCount}</Text>
        </View>
        <Pressable
          style={{flex: 0, alignSelf: 'center'}}
          onPress={() => {
            setWallpapersListing(prev =>
              prev.map((wallpaper, index) => {
                if (index === selectedPage) {
                  wallpaper.isLiked = !wallpapersListing[selectedPage].isLiked;
                }
                return wallpaper;
              }),
            );
          }}>
          <Text style={{fontSize: 25}}>
            {wallpapersListing[selectedPage].isLiked ? 'Liked' : 'Like'}
          </Text>
        </Pressable>
      </View>

      <PagerView
        style={{flex: 1}}
        initialPage={selectedPage}
        onPageSelected={e => {
          setSelectedPage(e.nativeEvent.position);
        }}>
        {wallpapersListing.map(wallpaper => {
          return <WallpaperPreviewBox uri={wallpaper.uri} key={wallpaper.id} />;
        })}
      </PagerView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingHorizontal: 20,
        }}>
        <WallpaperPreviewOption />
        <WallpaperPreviewOption />
        <WallpaperPreviewOption />
      </View>
    </View>
  ) : null;
};

export default PreviewScreen;

const WallpaperPreviewBox = ({uri}: {uri: string}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <Image
        source={{
          uri: uri,
        }}
        alt="image"
        resizeMode="cover"
        style={{width: '100%', height: '100%', borderRadius: 10}}
      />
    </View>
  );
};

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
