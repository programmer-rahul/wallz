import {ParamListBase} from '@react-navigation/native';

interface TRootStackParamList extends ParamListBase {
  Home: undefined;
  Preview: {index: number};
}

export type {TRootStackParamList};
