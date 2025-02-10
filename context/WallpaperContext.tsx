import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import useAxios from '../hooks/useAxios';
import { TWallpaper } from '@/types/wallpaper';

type TSelectedBottomSheet = 'set-wallpaper' | null;

interface TPreviewScreenStates {
  defaultWallpapers: TWallpaper[],
  index: number,
  category: string,
  hasMore: boolean,
  pageNumber: number,
}

interface TWallpaperContext {
  likedWallpapers: string[];
  setLikedWallpapers: Dispatch<SetStateAction<string[]>>;
  viewedWallpapers: string[];
  increaseWallpaperCount: (id: string, type: 'view' | 'download') => void;

  selectedBottomSheet: TSelectedBottomSheet;
  setSelectedBottomSheet: Dispatch<SetStateAction<TSelectedBottomSheet>>;
  setViewedWallpapers: Dispatch<SetStateAction<string[]>>;

  previewScreenStates: null | TPreviewScreenStates
  setPreviewScreenStates: Dispatch<SetStateAction<null | TPreviewScreenStates>>
}

const WallpaperContext = createContext<TWallpaperContext>({
  likedWallpapers: [],
  setLikedWallpapers: () => { },
  selectedBottomSheet: null,
  setSelectedBottomSheet: () => { },
  viewedWallpapers: [],
  setViewedWallpapers: () => { },

  increaseWallpaperCount: () => { },

  previewScreenStates: null,
  setPreviewScreenStates: () => { }
});

const useLikedWallpapers = () => {
  const [likedWallpapers, setLikedWallpapers] = useState<string[]>([]);

  useEffect(() => {
    const fetchLikedWallpapersFromLocal = async () => {
      try {
        const jsonValues = await AsyncStorage.getItem('@likedWallpapers');
        const fetchedWallpapers = jsonValues !== null ? JSON.parse(jsonValues) : [];
        setLikedWallpapers(fetchedWallpapers);
      } catch (err) {
        console.error('Error while fetching liked wallpapers from local storage', err);
      }
    };

    fetchLikedWallpapersFromLocal();
  }, []);

  useEffect(() => {
    const saveLikedWallpapersInLocal = async () => {
      try {
        const jsonValues = JSON.stringify(likedWallpapers);
        await AsyncStorage.setItem('@likedWallpapers', jsonValues);
      } catch (err) {
        console.error('Error while saving liked wallpapers in local storage', err);
      }
    };

    if (likedWallpapers.length) {
      saveLikedWallpapersInLocal();
    }
  }, [likedWallpapers]);

  return [likedWallpapers, setLikedWallpapers] as const;
};

const WallpaperProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedWallpapers, setLikedWallpapers] = useLikedWallpapers();
  const [selectedBottomSheet, setSelectedBottomSheet] = useState<TSelectedBottomSheet>(null);
  const [viewedWallpapers, setViewedWallpapers] = useState<string[]>([]);
  const [previewScreenStates, setPreviewScreenStates] = useState<null | TPreviewScreenStates>(null);

  const { apiCall } = useAxios();

  const increaseWallpaperCount = async (id: string, type: 'view' | 'download') => {
    if (type === 'view') {
      setViewedWallpapers(prev => {
        if (prev.includes(id)) return prev;

        apiCall({
          method: 'put',
          url: `/wallpaper/inc-view-count`,
          params: { wallpaperId: id },
        }).catch(err => console.error('Error increasing view count', err));

        return [...prev, id];
      });
    } else if (type === 'download') {
      apiCall({
        method: 'put',
        url: `/wallpaper/inc-download-count`,
        params: { wallpaperId: id },
      }).catch(err => console.error('Error increasing download count', err));
    }
  };

  const contextValue = useMemo(() => ({
    likedWallpapers,
    setLikedWallpapers,
    selectedBottomSheet,
    setSelectedBottomSheet,
    viewedWallpapers,
    setViewedWallpapers,
    increaseWallpaperCount,
    previewScreenStates,
    setPreviewScreenStates,
  }), [
    likedWallpapers,
    selectedBottomSheet,
    viewedWallpapers,
    previewScreenStates,
  ]);

  return (
    <WallpaperContext.Provider value={contextValue}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
export default WallpaperProvider;