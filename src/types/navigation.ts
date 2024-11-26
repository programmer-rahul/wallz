import {ParamListBase} from '@react-navigation/native';
import {TCategoryNames} from './category';
import {TWallpaper} from './wallpaper';

interface TRootStackParamList extends ParamListBase {
  Home: undefined;
  Preview: {
    index: number;
    category: TCategoryNames;
    defaultWallpapers: TWallpaper[];
    pageNumber: number;
    hasMore: boolean;
  };
}
interface TCategoryTabStackParamList extends ParamListBase {
  CategoryMain: undefined;
  CategoryWallpaperListing: {
    category: TCategoryNames;
  };
}

export type {TRootStackParamList, TCategoryTabStackParamList};
