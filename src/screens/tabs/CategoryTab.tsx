import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import {TRootStackParamList} from '../../types/navigation';
import {useEffect, useState} from 'react';
import useAxios from '../../hooks/useAxios';

interface TCategory {
  name: string;
  previewUrl: string;
}

const CategoryTab = () => {
  const [allCategories, setAllCategories] = useState<TCategory[]>([]);

  const {isLoading, apiCall} = useAxios();

  useEffect(() => {
    console.log('rendered');

    (async () => {
      const response = await apiCall({
        method: 'get',
        url: '/category/get-categories/',
      });
      if (response) {
        setAllCategories(response.allCategories);
      }
    })();
  }, []);

  return (
    <View style={{flexDirection: 'column', flex: 1, padding: 10, gap: 10}}>
      <Text style={{fontSize: 30, textTransform: 'capitalize'}}>Category</Text>

      {isLoading && !allCategories.length ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
          }}
          data={allCategories}
          renderItem={({item, index}) => {
            return (
              <CategoryListItem
                key={index}
                categoryName={item.name}
                previewUrl={item.previewUrl}
              />
            );
          }}
          ListFooterComponent={() => <View style={{paddingBottom: 10}} />}
        />
      )}
    </View>
  );
};

export default CategoryTab;

const CategoryListItem = ({
  previewUrl,
  categoryName,
}: {
  previewUrl: string;
  categoryName: string;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();

  return (
    <Pressable
      style={{
        width: '100%',
        aspectRatio: 3 / 1,
        flex: 1,
        marginBottom: 10,
      }}
      onPress={() => {
        navigation.navigate('CategoryWallpaperListing', {
          category: categoryName,
        });
      }}>
      <Image
        source={{uri: previewUrl}}
        alt="image"
        resizeMode="cover"
        style={{width: '100%', height: '100%', borderRadius: 6}}
      />
      <Text
        style={{
          fontSize: 25,
          position: 'absolute',
          bottom: 4,
          left: 4,
          color: '#fff',
        }}>
        {categoryName}
      </Text>
    </Pressable>
  );
};
