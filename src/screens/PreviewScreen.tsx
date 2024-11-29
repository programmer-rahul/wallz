import {Alert, Image, Pressable, Text, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useEffect, useState} from 'react';
import {TWallpaper} from '../types/wallpaper';
import {TRootStackParamList} from '../types/navigation';
import {RouteProp} from '@react-navigation/native';
import RTNDeviceWallpaper from 'react-native-device-wallpaper-manager/js/NativeDeviceWallpaper';
import useAxios from '../hooks/useAxios';
import WallpaperLikeBtn from '../components/WallpaperLikeBtn';
import {ArrowDownToLine, Eye, Stamp} from 'lucide-react-native';
import RNFS from 'react-native-fs';
import {LIMIT} from '../constants/api';
import RenderImage from '../components/RenderImage';

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
      fetchWallpapers({limit: LIMIT, page: pageNumber + 1});
    }
  }, [selectedPage]);

  return (
    String(wallpaperListing.length) && (
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: '#cccddd',
          flexDirection: 'column',
          rowGap: 20,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', gap: 3, alignItems: 'center'}}>
              <Eye size={16} />
              <Text>
                Views : {wallpaperListing[selectedPage]?.viewsCount || 0}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 3, alignItems: 'center'}}>
              <ArrowDownToLine size={16} />
              <Text>
                Downloads : {wallpaperListing[selectedPage]?.downloadCount || 0}
              </Text>
            </View>
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
        </View>
      </View>
    )
  );
};

export default PreviewScreen;

const WallpaperPreviewBox = ({url}: {url: string}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <RenderImage url={url} />
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
    try {
      console.log('url', url);
      const status = await RTNDeviceWallpaper?.setWallpaper(url, 'both');
      console.log('get', await RTNDeviceWallpaper?.getConstants);
      console.log('status', status);
    } catch (error) {
      console.log('Error while setting wallpaper', error);
    }
  };

  const downloadWallpaper = async (imageUrl: string) => {
    // Extract file name from the URL
    const fileName = imageUrl.split('/').pop();
    const directoryPath = `${RNFS.DownloadDirectoryPath}/wallpaper-app`;
    const downloadPath = `${directoryPath}/${fileName}`;

    try {
      // Check if the directory exists; if not, create it
      const directoryExists = await RNFS.exists(directoryPath);
      if (!directoryExists) {
        await RNFS.mkdir(directoryPath);
      }

      // Download the file to the specified directory
      const result = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadPath,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('Success', 'Wallpaper saved successfully');
      } else {
        Alert.alert('Error', 'Failed to save the wallpaper.');
      }
    } catch (error) {
      console.error('Error saving wallpaper:', error);
      Alert.alert('Error', 'An error occurred while saving the wallpaper.');
    }
  };

  return (
    <Pressable
      onPress={() => {
        type === 'set-wallpaper' && setWallpaper();
        type === 'download-wallpaper' && downloadWallpaper(url);
      }}
      style={{
        width: '15%',
        aspectRatio: 1 / 1,
        backgroundColor: '#00199a',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {type === 'download-wallpaper' && (
        <ArrowDownToLine size={25} color={'#fff333'} />
      )}
      {type === 'set-wallpaper' && <Stamp size={25} color={'#fff333'} />}
    </Pressable>
  );
};
