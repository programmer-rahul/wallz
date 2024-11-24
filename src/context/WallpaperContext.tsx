import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {TWallpaper} from '../types/wallpaper';
import {DefaultWallpapers} from '../libs/data';

interface TWallpaperContext {
  wallpapersList: TWallpaper[];
  setWallpapersList: Dispatch<SetStateAction<TWallpaper[]>>;

  selectedPreviewWallpaper: TWallpaper | null;
  setSelectedPreviewWallpaper: Dispatch<SetStateAction<TWallpaper | null>>;
}

const WallpaperContext = createContext<TWallpaperContext>({
  wallpapersList: DefaultWallpapers,
  setWallpapersList: () => {},
  selectedPreviewWallpaper: null,
  setSelectedPreviewWallpaper: () => {},
});

const WallpaperProvider = ({children}: {children: React.ReactNode}) => {
  const [wallpapersList, setWallpapersList] =
    useState<TWallpaper[]>(DefaultWallpapers);

  const [selectedPreviewWallpaper, setSelectedPreviewWallpaper] =
    useState<TWallpaper | null>(null);

  return (
    <WallpaperContext.Provider
      value={{
        wallpapersList,
        setWallpapersList,
        selectedPreviewWallpaper,
        setSelectedPreviewWallpaper,
      }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
export default WallpaperProvider;
