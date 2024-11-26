import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
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
