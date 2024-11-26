import {Image, Pressable, Text, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useEffect, useState} from 'react';
import {TWallpaper} from '../types/wallpaper';
import {TRootStackParamList} from '../types/navigation';
import {RouteProp} from '@react-navigation/native';
import RTNDeviceWallpaper from 'react-native-device-wallpaper-manager/js/NativeDeviceWallpaper';
import useAxios from '../hooks/useAxios';
import WallpaperLikeBtn from '../components/WallpaperLikeBtn';

type TPreviewScreenRouteProp = RouteProp<TRootStackParamList, 'Preview'>;

const PreviewScreen = ({route}: {route: TPreviewScreenRouteProp}) => {
  const {
    index,
    category,
    defaultWallpapers,
    hasMore: defaultHasMore,
    pageNumber: defaultPageNumber,
  } = route.params;
  const {isLoading, apiCall} = useAxios();

  const [selectedPage, setSelectedPage] = useState(index || 0);
  const [wallpaperListing, setWallpaperListing] = useState<TWallpaper[]>(
    defaultWallpapers || [],
  );
  const [pageNumber, setPageNumber] = useState(defaultPageNumber);
  const [hasMore, setHasMore] = useState(defaultHasMore);

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
    if (response) {
      if (response.wallpapers.length === 0) {
        return setHasMore(false);
      }
      setWallpaperListing(prev => [...prev, ...response.wallpapers]);
    }
  };

  useEffect(() => {
    if (wallpaperListing.length === 0 || !hasMore) return;
    if (selectedPage + 1 >= wallpaperListing.length - 1 && !isLoading) {
      setPageNumber(prev => prev + 1);
      fetchWallpapers({limit: 8, page: pageNumber + 1});
    }
  }, [selectedPage]);

  return (
    String(wallpaperListing.length) && (
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
            <Text>{wallpaperListing[selectedPage]?.name}</Text>
            <Text>
              Views : {wallpaperListing[selectedPage]?.viewsCount || 0}
            </Text>
          </View>
          <WallpaperLikeBtn wallpaperId={wallpaperListing[selectedPage].id} />
        </View>

        <PagerView
          style={{flex: 1, display: 'flex'}}
          initialPage={selectedPage}
          onPageSelected={e => {
            setSelectedPage(e.nativeEvent.position);
          }}>
          {wallpaperListing.map(wallpaper => {
            return (
              <WallpaperPreviewBox url={wallpaper.url} key={wallpaper.id} />
            );
          })}
        </PagerView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: 20,
            display: 'flex',
          }}>
          <WallpaperPreviewOption
            type="download-wallpaper"
            url={wallpaperListing[selectedPage].url}
          />
          <WallpaperPreviewOption
            type="set-wallpaper"
            url={wallpaperListing[selectedPage].url}
          />
          <WallpaperPreviewOption
            type="set-wallpaper"
            url={wallpaperListing[selectedPage].url}
          />
        </View>
      </View>
    )
  );
};

export default PreviewScreen;

const WallpaperPreviewBox = ({url}: {url: string}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <Image
        source={{
          uri: url,
        }}
        alt="image"
        resizeMode="cover"
        style={{width: '100%', height: '100%', borderRadius: 10}}
      />
    </View>
  );
};

const WallpaperPreviewOption = ({
  type,
  url,
}: {
  type: 'set-wallpaper' | 'download-wallpaper';
  url: string;
}) => {
  const setWallpaper = async () => {
    console.log('url', url);
    await RTNDeviceWallpaper?.setWallpaper(
      'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'both',
    );
  };

  const downloadWallpaper = () => {};

  return (
    <Pressable
      onPress={() => {
        // setSelectedBottomSheet('set-wallpaper');

        type === 'set-wallpaper' && setWallpaper();
        type === 'download-wallpaper' && downloadWallpaper();
      }}
      style={{
        width: '15%',
        aspectRatio: 1 / 1,
        backgroundColor: '#00199a',
        borderRadius: '50%',
      }}></Pressable>
  );
};
