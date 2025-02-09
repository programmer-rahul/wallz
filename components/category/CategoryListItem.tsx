import { router } from "expo-router";
import { Image, Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";


const CategoryListItem = ({
    previewUrl,
    categoryName,
}: {
    previewUrl: string;
    categoryName: string;
}) => {

    return (
        <Pressable
            style={styles.pressable}
            onPress={() => {
                router.push(`/category/listing?category=${categoryName}`);
            }}>
            <Image
                source={{ uri: previewUrl }}
                alt="image"
                resizeMode="cover"
                style={styles.image}
            />
            <Text
                style={styles.text}>
                {categoryName}
            </Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    pressable: {
        width: '100%',
        aspectRatio: 3 / 1,
        flex: 1,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    text: {
        fontSize: 25,
        position: 'absolute',
        bottom: 4,
        left: 4,
        color: '#fff',
        fontFamily: "Montserrat_500Medium"
    },
});

export default CategoryListItem;