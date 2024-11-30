import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import useAxios from '../hooks/useAxios';
import {downloadFile} from 'react-native-fs';

type TSelectedBottomSheet = 'set-wallpaper' | null;

interface TWallpaperContext {
  likedWallpapers: string[];
  setLikedWallpapers: Dispatch<SetStateAction<string[]>>;
  viewedWallpapers: string[];
  increaseWallpaperCount: (id: string, type: 'view' | 'download') => void;

  selectedBottomSheet: TSelectedBottomSheet;
  setSelectedBottomSheet: Dispatch<SetStateAction<TSelectedBottomSheet>>;
  setViewedWallpapers: Dispatch<SetStateAction<string[]>>;
}

const WallpaperContext = createContext<TWallpaperContext>({
  likedWallpapers: [],
  setLikedWallpapers: () => {},
  selectedBottomSheet: null,
  setSelectedBottomSheet: () => {},
  viewedWallpapers: [],
  setViewedWallpapers: () => {},

  increaseWallpaperCount: () => {},
});

const WallpaperProvider = ({children}: {children: React.ReactNode}) => {
  const [likedWallpapers, setLikedWallpapers] = useState<string[]>([]);
  const [selectedBottomSheet, setSelectedBottomSheet] =
    useState<TSelectedBottomSheet>(null);
  const [viewedWallpapers, setViewedWallpapers] = useState<string[]>([]);

  const saveLikedWallpapersInLocal = async () => {
    try {
      const jsonValues = JSON.stringify(likedWallpapers);
      await AsyncStorage.setItem('@likedWallpapers', jsonValues);
    } catch (err) {
      console.log('error while saving in localstorage');
    }
  };

  const fetchLikedWallpapersFromLocal = async () => {
    try {
      const jsonValues = await AsyncStorage.getItem('@likedWallpapers');
      const fetchedWallpapers =
        jsonValues !== null ? JSON.parse(jsonValues) : [];
      setLikedWallpapers(fetchedWallpapers);
    } catch (err) {
      console.log('error while fetching likedWallpaers from localstorage');
    }
  };

  useEffect(() => {
    fetchLikedWallpapersFromLocal();
  }, []);

  useEffect(() => {
    if (likedWallpapers.length) {
      saveLikedWallpapersInLocal();
    }
  }, [likedWallpapers]);

  const {apiCall} = useAxios();

  const increaseWallpaperCount = async (
    id: string,
    type: 'view' | 'download',
  ) => {
    type == 'view' &&
      setViewedWallpapers(prev => {
        if (prev.some(viewedId => viewedId === id)) return prev;

        apiCall({
          method: 'put',
          url: `/wallpaper/inc-view-count`,
          params: {
            wallpaperId: id,
          },
        });
        return [...prev, id];
      });

    type === 'download' &&
      apiCall({
        method: 'put',
        url: `/wallpaper/inc-download-count`,
        params: {
          wallpaperId: id,
        },
      });
  };

  return (
    <WallpaperContext.Provider
      value={{
        likedWallpapers,
        setLikedWallpapers,
        selectedBottomSheet,
        setSelectedBottomSheet,
        viewedWallpapers,
        setViewedWallpapers,
        increaseWallpaperCount,
      }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
export default WallpaperProvider;
