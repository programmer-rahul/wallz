import {ParamListBase} from '@react-navigation/native';
import {TCategoryNames} from './category';

interface TRootStackParamList extends ParamListBase {
  Home: undefined;
  Preview: {
    index: number;
    category: TCategoryNames;
  };
}
interface TCategoryTabStackParamList extends ParamListBase {
  CategoryMain: undefined;
  CategoryWallpaperListing: {
    category: TCategoryNames;
  };
}

export type {TRootStackParamList, TCategoryTabStackParamList};
