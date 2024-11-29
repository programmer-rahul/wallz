import {useEffect, useState} from 'react';
import useAxios from '../hooks/useAxios';
import {TWallpaper} from '../types/wallpaper';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRootStackParamList} from '../types/navigation';
import {TCategoryNames} from '../types/category';
import WallpaperLikeBtn from './WallpaperLikeBtn';
import {useWallpaper} from '../context/WallpaperContext';
import {LIMIT} from '../constants/api';
import RenderImage from './RenderImage';

const WallpapersListing = ({category}: {category: TCategoryNames}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();
  const {isLoading, apiCall} = useAxios();
  const {likedWallpapers} = useWallpaper();

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
        ...(category === 'favourite' && {
          favouriteIds: JSON.stringify(likedWallpapers),
        }),
      },
    });
    console.log('response', response.wallpapers.length);
    if (response) {
      if (response.wallpapers.length === 0) {
        return setHasMore(false);
      }
      setWallpaperListing(prev => [...prev, ...response.wallpapers]);

      if (response.totalCount <= wallpaperListing.length + limit) {
        return setHasMore(false);
      }
    }
  };

  useEffect(() => {
    category !== 'favourite' &&
      fetchWallpapers({limit: LIMIT, page: pageNumber});
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (category === 'favourite' && isFocused && !isLoading) {
      setWallpaperListing([]);
      fetchWallpapers({limit: LIMIT, page: 1});
      setPageNumber(prev => prev + 1);
    }
  }, [isFocused]);

  return (
    <View style={{padding: 10, flexDirection: 'column', gap: 10, flex: 1}}>
      <Text style={{fontSize: 30, textTransform: 'capitalize'}}>
        {category === 'all-wallpapers' ? 'Wallpapers' : category}
      </Text>

      {isLoading && !wallpaperListing.length ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
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
            fetchWallpapers({limit: LIMIT, page: pageNumber + 1});
            setPageNumber(prev => prev + 1);
          }}
          ListFooterComponent={() => {
            return (
              <View style={{paddingBottom: 20}}>
                {isLoading && <ActivityIndicator size={'large'} />}
              </View>
            );
          }}
          keyExtractor={item => item.id}
          // initialNumToRender={8}
          // maxToRenderPerBatch={8}
          // windowSize={10}
          showsVerticalScrollIndicator={false}
        />
      )}
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
        aspectRatio: 9 / 16,
        flex: 1,
      }}
      onPress={() => {
        onPress();
      }}>
      <RenderImage url={url} />
      <View style={{position: 'absolute', bottom: 4, right: 4}}>
        <WallpaperLikeBtn wallpaperId={id} hideOnUnlike />
      </View>
    </Pressable>
  );
};


