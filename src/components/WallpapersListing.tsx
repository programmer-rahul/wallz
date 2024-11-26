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
    <FlatList
      style={{width: '100%', backgroundColor: 'transparent', padding: 10}}
      data={wallpaperListing}
      renderItem={({item, index}) => {
        return (
          <WallpaperListItem
            url={item.url}
            key={index}
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
  );
};

export default WallpapersListing;

const WallpaperListItem = ({
  url,

  onPress,
}: {
  url: string;

  onPress: () => void;
}) => {
  return (
    <Pressable
      style={{
        width: '50%',
        height: 200,
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
    </Pressable>
  );
};
