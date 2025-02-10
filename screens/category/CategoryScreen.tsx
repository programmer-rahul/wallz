import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import COLORS from '@/constants/COLORS';
import CategoryListItem from '@/components/category/CategoryListItem';
import { TCategory } from '@/types/category';

const CategoryScreen = () => {
    const [allCategories, setAllCategories] = useState<TCategory[]>([]);
    const { isLoading, apiCall } = useAxios();

    // fetch categories from api 
    const fetchCategories = async () => {
        const { data } = await apiCall({
            method: 'get',
            url: '/category/get-categories/',
        });
        if (data) {
            setAllCategories(data?.allCategories);
        }
    }

    // call api initialy
    useEffect(() => {
        fetchCategories()
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image
                    style={{ width: 45, height: 35 }}
                    source={require('@/assets/images/small-icon.png')}
                    resizeMode={"contain"}
                />
                <Text style={styles.title}>
                    Category
                </Text>
            </View>

            {isLoading && !allCategories.length ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.main} />
                </View>
            ) : (
                <FlatList
                    style={styles.flatList}
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
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    ListFooterComponent={() => <View style={styles.footer} />}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        gap: 10,
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 30,
        textTransform: 'capitalize',
        color: COLORS.primary_text,
        fontFamily: 'Montserrat_500Medium',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        padding: 4
    },
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 10,
    },
    footer: {
        paddingBottom: 10,
    },
});

export default CategoryScreen;
