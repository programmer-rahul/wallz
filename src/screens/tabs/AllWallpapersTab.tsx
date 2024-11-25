import {FlatList, Image, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useWallpaper} from '../../context/WallpaperContext';
import {DefaultWallpapers} from '../../libs/data';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRootStackParamList} from '../../types/navigation';

const AllWallpapersTab = () => {
  const {wallpapersList} = useWallpaper();

  return (
    <View style={{height: '100%'}}>
      <FlatList
        style={{width: '100%', backgroundColor: 'transparent', padding: 10}}
        data={wallpapersList}
        renderItem={({item, index}) => {
          return (
            <WallpaperListItem
              uri={item.uri}
              key={item.id}
              id={item.id}
              index={index}
            />
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

export default AllWallpapersTab;

const WallpaperListItem = ({
  uri,
  id,
  index,
}: {
  uri: string;
  id: number;
  index: number;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();
  const {setSelectedPreviewWallpaper} = useWallpaper();

  return (
    <Pressable
      style={{
        width: '50%',
        borderWidth: 2,
        height: 200,
      }}
      onPress={() => {
        setSelectedPreviewWallpaper(
          DefaultWallpapers.find(wallpaper => wallpaper.id === id) || null,
        );
        navigation.navigate('Preview', {index: index});
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
