import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { TWallpaper } from '../types/wallpaper';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TCategoryNames } from '../types/category';
import { useWallpaper } from '../context/WallpaperContext';
import { LIMIT } from '../constants/API';
import WallpaperListItem from './WallpaperListItem';
import { router } from 'expo-router';
import COLORS from '@/constants/COLORS';

const WallpapersListing = ({ category }: { category: TCategoryNames }) => {

  // global states and hooks
  const { isLoading, apiCall } = useAxios();
  const { likedWallpapers, setPreviewScreenStates } = useWallpaper();

  // states for wallpaper listing
  const [wallpaperListing, setWallpaperListing] = useState<TWallpaper[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFocused = useIsFocused();

  // fetch wallpapers from the server
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

  // fetch wallpapers on initial render
  useEffect(() => {
    category !== 'favourite' &&
      fetchWallpapers({ limit: LIMIT, page: pageNumber });
  }, []);

  // fetch favourite wallpapers on focus
  useEffect(() => {
    if (category === 'favourite' && isFocused && !isLoading) {
      setWallpaperListing([]);
      fetchWallpapers({ limit: LIMIT, page: 1 });
      setPageNumber(prev => prev + 1);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {category === 'all-wallpapers' ? 'Wallpapers' : category}
      </Text>

      {isLoading && !wallpaperListing.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.main} />
        </View>
      ) : (
        <FlatList
          style={styles.flatList}
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
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
          onEndReached={e => {
            if (!hasMore || isLoading) return;
            console.log('end reached', e.distanceFromEnd);
            fetchWallpapers({ limit: LIMIT, page: pageNumber + 1 });
            setPageNumber(prev => prev + 1);
          }}
          ListFooterComponent={() => {
            return (
              <View style={styles.footer}>
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    gap: 10,
    flex: 1,
  },
  title: {
    fontSize: 30,
    textTransform: 'capitalize',
    color: COLORS.primary_text,
    fontFamily: 'Montserrat_500Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 10,
  },
  contentContainer: {
    gap: 10,
  },
  footer: {
    paddingBottom: 20,
  },
});

export default WallpapersListing;
