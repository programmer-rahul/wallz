import {useState} from 'react';
import {FlatList, Image, Pressable, View} from 'react-native';
import {TWallpaper} from '../../types/wallpaper';
import {useNavigation} from '@react-navigation/native';

const DefaultWallpapers: TWallpaper[] = [
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/1.jpeg',
    title: 'wallpaper-1',
    isLiked: false,
    viewsCount: 0,
    id: 1,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/2.jpeg',
    title: 'wallpaper-2',
    isLiked: false,
    viewsCount: 0,
    id: 2,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/3.jpeg',
    title: 'wallpaper-3',
    isLiked: false,
    viewsCount: 0,
    id: 3,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/4.jpeg',
    title: 'wallpaper-4',
    isLiked: false,
    viewsCount: 0,
    id: 4,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/5.jpeg',
    title: 'wallpaper-5',
    isLiked: false,
    viewsCount: 0,
    id: 5,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/6.jpeg',
    title: 'wallpaper-6',
    isLiked: false,
    viewsCount: 0,
    id: 6,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/7.jpeg',
    title: 'wallpaper-7',
    isLiked: false,
    viewsCount: 0,
    id: 7,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/8.jpeg',
    title: 'wallpaper-8',
    isLiked: false,
    viewsCount: 0,
    id: 8,
  },
  {
    uri: 'https://api.slingacademy.com/public/sample-photos/9.jpeg',
    title: 'wallpaper-9',
    isLiked: false,
    viewsCount: 0,
    id: 9,
  },
];

const AllWallpapersTab = () => {
  const [wallpapersList, setWallpapersList] =
    useState<TWallpaper[]>(DefaultWallpapers);

  return (
    <View style={{height: '100%'}}>
      <FlatList
        style={{width: '100%', backgroundColor: 'transparent', padding: 10}}
        data={wallpapersList}
        renderItem={({item}) => {
          return (
            <WallpaperListItem uri={item.uri} key={item.id} id={item.id} />
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

export default AllWallpapersTab;

const WallpaperListItem = ({uri, id}: {uri: string; id: number}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        width: '50%',
        borderWidth: 2,
        height: 200,
      }}
      onPress={() => {
        navigation.navigate('Preview');
      }}>
      <Image
        source={{uri: uri}}
        alt="image"
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}
      />
    </Pressable>
  );
};
