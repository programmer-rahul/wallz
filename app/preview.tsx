import { Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useState } from 'react';
import { TWallpaper } from '../types/wallpaper';
import useAxios from '../hooks/useAxios';
import WallpaperLikeBtn from '../components/WallpaperLikeBtn';
import { ArrowDownToLine, Eye } from 'lucide-react-native';

import { LIMIT } from '../constants/API';
import { useWallpaper } from '../context/WallpaperContext';
import WallpaperPreviewBox from '../components/WallpaperPreviewBox';
import WallpaperOptions from '../components/WallpaperOptions';
import COLORS from '@/constants/COLORS';

const PreviewScreen = () => {
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
          backgroundColor: COLORS.background,
          flexDirection: 'column',
          flex: 1,
        }}>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            paddingRight: 16,
            paddingLeft: 6,
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

        <View style={{ position: "relative", flex: 1, }}>
          <PagerView
            style={{ flex: 1, display: 'flex', }}
            initialPage={selectedPage}
            orientation={'vertical'}
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
              gap: 14,
              right: 40,
              bottom: 40,
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
      </View>
    )
  );
};

export default PreviewScreen;
