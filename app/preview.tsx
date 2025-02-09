import { Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useState } from 'react';
import { TWallpaper } from '../types/wallpaper';
import { TRootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import useAxios from '../hooks/useAxios';
import WallpaperLikeBtn from '../components/WallpaperLikeBtn';
import { ArrowDownToLine, Eye } from 'lucide-react-native';

import { LIMIT } from '../constants/api';
import { useWallpaper } from '../context/WallpaperContext';
import WallpaperPreviewBox from '../components/WallpaperPreviewBox';
import WallpaperOptions from '../components/WallpaperOptions';

type TPreviewScreenRouteProp = RouteProp<TRootStackParamList, 'Preview'>;

const PreviewScreen = ({ route }: { route: TPreviewScreenRouteProp }) => {
  const { previewScreenStates } = useWallpaper();
  if (previewScreenStates === null) return null;

  const {
    index,
    category,
    defaultWallpapers,
    hasMore: defaultHasMore,
    pageNumber: defaultPageNumber,
  } = previewScreenStates;

  const { isLoading, apiCall } = useAxios();
  const { increaseWallpaperCount } = useWallpaper();

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
    const { data } = await apiCall({
      method: 'get',
      url: '/wallpaper/get-wallpaper/' + category,
      params: {
        limit: limit,
        page: page,
      },
    });
    if (data) {
      if (data.wallpapers.length === 0) {
        return setHasMore(false);
      }
      setWallpaperListing(prev => [...prev, ...data.wallpapers]);
    }
  };

  return (
    String(wallpaperListing.length) && (
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: '#bbbddd',
          flexDirection: 'column',
          rowGap: 10,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            paddingHorizontal: 20,
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
              <Eye size={16} />
              <Text>
                Views : {wallpaperListing[selectedPage]?.viewsCount || 0}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
              <ArrowDownToLine size={16} />
              <Text>
                Downloads : {wallpaperListing[selectedPage]?.downloadCount || 0}
              </Text>
            </View>
          </View>
          <WallpaperLikeBtn wallpaperId={wallpaperListing[selectedPage].id} />
        </View>

        <PagerView
          style={{ flex: 1, display: 'flex' }}
          initialPage={selectedPage}
          orientation={'horizontal'}
          onPageSelected={e => {
            setSelectedPage(e.nativeEvent.position);
            if (
              e.nativeEvent.position + 1 >= wallpaperListing.length - 2 &&
              !isLoading &&
              hasMore
            ) {
              setPageNumber(prev => prev + 1);
              fetchWallpapers({ limit: LIMIT, page: pageNumber + 1 });
            }

            increaseWallpaperCount(wallpaperListing[selectedPage].id, 'view');
          }}>
          {wallpaperListing.map((wallpaper, index) => (
            <WallpaperPreviewBox
              key={String(index) + String(wallpaper.id)}
              url={wallpaper.url}
            />
          ))}
        </PagerView>

        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 15,
            right: 28,
            bottom: 28,
          }}>
          <WallpaperOptions
            type="download-wallpaper"
            url={wallpaperListing[selectedPage].url}
            id={wallpaperListing[selectedPage].id}
          />
          <WallpaperOptions
            type="set-wallpaper"
            url={wallpaperListing[selectedPage].url}
            id={wallpaperListing[selectedPage].id}
          />
        </View>
      </View>
    )
  );
};

export default PreviewScreen;
