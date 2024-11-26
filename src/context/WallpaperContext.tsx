import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type TSelectedBottomSheet = 'set-wallpaper' | null;

interface TWallpaperContext {
  likedWallpapers: string[];
  setLikedWallpapers: Dispatch<SetStateAction<string[]>>;

  selectedBottomSheet: TSelectedBottomSheet;
  setSelectedBottomSheet: Dispatch<SetStateAction<TSelectedBottomSheet>>;
}

const WallpaperContext = createContext<TWallpaperContext>({
  likedWallpapers: [],
  setLikedWallpapers: () => {},
  selectedBottomSheet: null,
  setSelectedBottomSheet: () => {},
});

const WallpaperProvider = ({children}: {children: React.ReactNode}) => {
  const [likedWallpapers, setLikedWallpapers] = useState<string[]>([]);
  const [selectedBottomSheet, setSelectedBottomSheet] =
    useState<TSelectedBottomSheet>(null);

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

  return (
    <WallpaperContext.Provider
      value={{
        likedWallpapers,
        setLikedWallpapers,
        selectedBottomSheet,
        setSelectedBottomSheet,
      }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
export default WallpaperProvider;
