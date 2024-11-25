import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {TWallpaper} from '../types/wallpaper';
import {DefaultWallpapers} from '../libs/data';

type TSelectedBottomSheet = 'set-wallpaper' | null;

interface TWallpaperContext {
  wallpapersList: TWallpaper[];
  setWallpapersList: Dispatch<SetStateAction<TWallpaper[]>>;
  selectedBottomSheet: TSelectedBottomSheet;

  selectedPreviewWallpaper: TWallpaper | null;
  setSelectedPreviewWallpaper: Dispatch<SetStateAction<TWallpaper | null>>;
  setSelectedBottomSheet: Dispatch<SetStateAction<TSelectedBottomSheet>>;
}

const WallpaperContext = createContext<TWallpaperContext>({
  wallpapersList: DefaultWallpapers,
  setWallpapersList: () => {},
  selectedPreviewWallpaper: null,
  setSelectedPreviewWallpaper: () => {},
  selectedBottomSheet: null,
  setSelectedBottomSheet: () => {},
});

const WallpaperProvider = ({children}: {children: React.ReactNode}) => {
  const [wallpapersList, setWallpapersList] =
    useState<TWallpaper[]>(DefaultWallpapers);

  const [selectedPreviewWallpaper, setSelectedPreviewWallpaper] =
    useState<TWallpaper | null>(null);

  const [selectedBottomSheet, setSelectedBottomSheet] =
    useState<TSelectedBottomSheet>(null);

  console.log('selected', selectedBottomSheet);

  return (
    <WallpaperContext.Provider
      value={{
        wallpapersList,
        setWallpapersList,
        selectedPreviewWallpaper,
        setSelectedPreviewWallpaper,
        selectedBottomSheet,
        setSelectedBottomSheet,
      }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
export default WallpaperProvider;
