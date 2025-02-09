import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { TWallpaper } from '../types/wallpaper';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useIsFocused, } from '@react-navigation/native';
import { TCategoryNames } from '../types/category';
import { useWallpaper } from '../context/WallpaperContext';
import { LIMIT } from '../constants/API';
import WallpaperListItem from './WallpaperListItem';
import { router } from 'expo-router';
import COLORS from '@/constants/COLORS';

const WallpapersListing = ({ category }: { category: TCategoryNames }) => {
  const { isLoading, apiCall } = useAxios();
  const { likedWallpapers, setPreviewScreenStates } = useWallpaper();

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
    const { data } = await apiCall({
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
    // console.log('data', data.wallpapers.length);
    if (data) {
      if (data.wallpapers.length === 0) {
        return setHasMore(false);
      }
      setWallpaperListing(prev => [...prev, ...data.wallpapers]);

      if (data.totalCount <= wallpaperListing.length + limit) {
        return setHasMore(false);
      }
    }
  };

  useEffect(() => {
    category !== 'favourite' &&
      fetchWallpapers({ limit: LIMIT, page: pageNumber });
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (category === 'favourite' && isFocused && !isLoading) {
      setWallpaperListing([]);
      fetchWallpapers({ limit: LIMIT, page: 1 });
      setPageNumber(prev => prev + 1);
    }
  }, [isFocused]);

  return (
    <View style={{ padding: 10, flexDirection: 'column', gap: 10, flex: 1 }}>
      <Text style={{ fontSize: 30, textTransform: 'capitalize' }}>
        {category === 'all-wallpapers' ? 'Wallpapers' : category}
      </Text>

      {isLoading && !wallpaperListing.length ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={COLORS.main} />
        </View>
      ) : (
        <FlatList
          style={{
            flex: 1,
          }}
          data={wallpaperListing}
          renderItem={({ item, index }) => {
            return (
              <WallpaperListItem
                url={item.url}
                key={String(index) + String(item.id)}
                id={item.id}
                onPress={() => {
                  setPreviewScreenStates(
                    {
                      defaultWallpapers: wallpaperListing,
                      index,
                      category,
                      hasMore,
                      pageNumber,
                    }
                  )
                  router.navigate('/preview');
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
            if (!hasMore || isLoading) return;
            console.log('end reached', e.distanceFromEnd);
            fetchWallpapers({ limit: LIMIT, page: pageNumber + 1 });
            setPageNumber(prev => prev + 1);
          }}
          ListFooterComponent={() => {
            return (
              <View style={{ paddingBottom: 20 }}>
                {isLoading && <ActivityIndicator size={'large'} color={COLORS.main} />}
              </View>
            );
          }}
          keyExtractor={item => item.id}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={10}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default WallpapersListing;
