import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { router } from 'expo-router';
import COLORS from '@/constants/COLORS';

interface TCategory {
  name: string;
  previewUrl: string;
}

const CategoryScreen = () => {
  const [allCategories, setAllCategories] = useState<TCategory[]>([]);
  const { isLoading, apiCall } = useAxios();

  useEffect(() => {
    (async () => {
      const { data } = await apiCall({
        method: 'get',
        url: '/category/get-categories/',
      });
      if (data) {
        setAllCategories(data?.allCategories);
      }
    })();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        gap: 10,
        backgroundColor: COLORS.background,
      }}>
      <Text style={{ fontSize: 30, textTransform: 'capitalize' }}>Category</Text>

      {isLoading && !allCategories.length ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={COLORS.main} />
        </View>
      ) : (
        <FlatList
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
          }}
          data={allCategories}
          renderItem={({ item, index }) => {
            return (
              <CategoryListItem
                key={index}
                categoryName={item.name}
                previewUrl={item.previewUrl}
              />
            );
          }}
          ListFooterComponent={() => <View style={{ paddingBottom: 10 }} />}
        />
      )}
    </View>
  );
};

export default CategoryScreen;

const CategoryListItem = ({
  previewUrl,
  categoryName,
}: {
  previewUrl: string;
  categoryName: string;
}) => {

  return (
    <Pressable
      style={{
        width: '100%',
        aspectRatio: 3 / 1,
        flex: 1,
        marginBottom: 10,
      }}
      onPress={() => {
        router.push(`/category/listing?category=${categoryName}`);
      }}>
      <Image
        source={{ uri: previewUrl }}
        alt="image"
        resizeMode="cover"
        style={{ width: '100%', height: '100%', borderRadius: 6 }}
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
