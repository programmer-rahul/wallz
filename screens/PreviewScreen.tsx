import { Text, View, StyleSheet } from 'react-native';
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.headerItem}>
                            <Eye size={16} />
                            <Text style={styles.headerItemText}>
                                Views : {wallpaperListing[selectedPage]?.viewsCount || 0}
                            </Text>
                        </View>
                        <View style={styles.headerItem}>
                            <ArrowDownToLine size={16} />
                            <Text style={styles.headerItemText}>
                                Downloads : {wallpaperListing[selectedPage]?.downloadCount || 0}
                            </Text>
                        </View>
                    </View>
                    <WallpaperLikeBtn wallpaperId={wallpaperListing[selectedPage].id} />
                </View>

                <View style={styles.pagerContainer}>
                    <PagerView
                        style={styles.pagerView}
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
                        }}
                    >
                        {wallpaperListing.map((wallpaper, index) => (
                            <WallpaperPreviewBox
                                key={String(index) + String(wallpaper.id)}
                                url={wallpaper.url}
                            />
                        ))}
                    </PagerView>

                    <View style={{ ...styles.optionsContainer }}>
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

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: COLORS.background,
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
    },
    headerLeft: {
        flex: 1,
    },
    headerItem: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
    },
    headerItemText: {
        color: COLORS.primary_text,
        fontWeight: "semibold",
        fontFamily: 'Montserrat_400Regular',
    },
    pagerContainer: {
        position: 'relative',
        flex: 1,
    },
    pagerView: {
        flex: 1,
        display: 'flex',
    },
    optionsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 12,
        right: 35,
        bottom: 35,
        transitionDuration: "1s",
    },
});

export default PreviewScreen;
