import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { TWallpaper } from '../types/wallpaper';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TCategoryNames } from '../types/category';
import { useWallpaper } from '../context/WallpaperContext';
import { LIMIT } from '../constants/API';
import WallpaperListItem from './WallpaperListItem';
import { router } from 'expo-router';
import COLORS from '@/constants/COLORS';
import NoWallpapersFound from './NoWallpapersFound';
import CardItemSkeltonLoader from './CardItemSkeltonLoader';
import ListSkeltonLoader from './ListSkeltonLoader';

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

      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ width: 45, height: 35 }}
          source={require('@/assets/images/small-icon.png')}
          resizeMode={"contain"}
        />
        <Text
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {category === 'all-wallpapers' ? 'Wallpapers' : category}
        </Text>
      </View>

      {isLoading && !wallpaperListing.length ? (
        <ListSkeltonLoader noOfItem={LIMIT} cardType="wallpaper" />
      ) : (
        wallpaperListing.length > 0 ? <FlatList
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
          showsVerticalScrollIndicator={false}
        /> : <NoWallpapersFound category={category} />
      )
      }
    </View >
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
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
    padding: 4
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


