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
import {TCategoryNames} from '../types/category';
import WallpaperLikeBtn from './WallpaperLikeBtn';

const WallpapersListing = ({category}: {category: TCategoryNames}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();
  const {isLoading, apiCall} = useAxios();

  const [wallpaperListing, setWallpaperListing] = useState<TWallpaper[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWallpapers = async ({
    limit,
    page,
  }: {
    limit: number;
    page: number;
  }) => {
    const response = await apiCall({
      method: 'get',
      url: '/wallpaper/get-wallpaper/' + category,
      params: {
        limit: limit,
        page: page,
      },
    });
    // console.log('response', response.wallpapers);
    if (response) {
      if (response.wallpapers.length === 0) {
        return setHasMore(false);
      }
      setWallpaperListing(prev => [...prev, ...response.wallpapers]);
    }
  };

  useEffect(() => {
    fetchWallpapers({limit: 8, page: pageNumber});
  }, []);

  return isLoading && !wallpaperListing.length ? (
    <View style={{marginTop: 100}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <View style={{padding: 10}}>
      <FlatList
        style={{
          width: '100%',
          backgroundColor: 'transparent',
        }}
        data={wallpaperListing}
        renderItem={({item, index}) => {
          return (
            <WallpaperListItem
              url={item.url}
              key={String(index) + String(item.id)}
              id={item.id}
              onPress={() => {
                navigation.navigate('Preview', {
                  defaultWallpapers: wallpaperListing,
                  index,
                  category,
                  hasMore,
                  pageNumber,
                });
              }}
            />
          );
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 10,
        }}
        contentContainerStyle={{
          gap: 10,
        }}
        onEndReached={e => {
          if (!hasMore) return;
          console.log('end reached', e.distanceFromEnd);
          setPageNumber(prev => prev + 1);
          fetchWallpapers({limit: 8, page: pageNumber + 1});
        }}
        ListFooterComponent={() => {
          return (
            isLoading && (
              <ActivityIndicator style={{paddingBottom: 20}} size={'large'} />
            )
          );
        }}
      />
    </View>
  );
};

export default WallpapersListing;

const WallpaperListItem = ({
  url,
  onPress,
  id,
}: {
  url: string;
  onPress: () => void;
  id: string;
}) => {
  return (
    <Pressable
      style={{
        aspectRatio: 1.3 / 2,
        flex: 1,
      }}
      onPress={() => {
        onPress();
      }}>
      <Image
        source={{uri: url}}
        alt="image"
        resizeMode="cover"
        style={{width: '100%', height: '100%', borderRadius: 6}}
      />
      <View style={{position: 'absolute', bottom: 4, right: 4}}>
        <WallpaperLikeBtn wallpaperId={id} hideOnUnlike />
      </View>
    </Pressable>
  );
};
