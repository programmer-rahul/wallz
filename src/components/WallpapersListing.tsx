import {useEffect, useState} from 'react';
import useAxios from '../hooks/useAxios';
import {TWallpaper} from '../types/wallpaper';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRootStackParamList} from '../types/navigation';
import {useWallpaper} from '../context/WallpaperContext';
import {DefaultWallpapers} from '../libs/data';
import {TCategoryNames} from '../types/category';

const WallpapersListing = ({category}: {category: TCategoryNames}) => {
  const {isLoading, apiCall} = useAxios();
  const [wallpaperListing, setWallpaperListing] = useState<TWallpaper[]>([]);

  useEffect(() => {
    console.log('rendered');

    (async () => {
      const response = await apiCall({
        method: 'get',
        url: '/wallpaper/get-wallpaper/' + category,
        params: {
          limit: 10,
          page: 1,
        },
      });
      console.log('response', response.wallpapers);
      if (response) {
        setWallpaperListing(response.wallpapers);
      }
    })();
  }, []);

  return isLoading ? (
    <View style={{marginTop: 100}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <FlatList
      style={{width: '100%', backgroundColor: 'transparent', padding: 10}}
      data={wallpaperListing}
      renderItem={({item, index}) => {
        return (
          <WallpaperListItem
            url={item.url}
            key={item.id}
            id={item.id}
            index={index}
          />
        );
      }}
      numColumns={2}
    />
  );
};

export default WallpapersListing;

const WallpaperListItem = ({
  url,
  id,
  index,
}: {
  url: string;
  id: number;
  index: number;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();
  const {setSelectedPreviewWallpaper} = useWallpaper();

  return (
    <Pressable
      style={{
        width: '50%',
        height: 200,
      }}
      onPress={() => {
        setSelectedPreviewWallpaper(
          DefaultWallpapers.find(wallpaper => wallpaper.id === id) || null,
        );
        navigation.navigate('Preview', {
          index: index,
          category: 'all-wallpapers',
        });
      }}>
      <Image
        source={{uri: url}}
        alt="image"
        resizeMode="cover"
        style={{width: '100%', height: '100%', borderRadius: 6}}
      />
    </Pressable>
  );
};
