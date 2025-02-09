import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import gradient
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
            {/* Gradient Overlay */}
            <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
                style={styles.gradient}
            />
            <Text style={styles.text}>{categoryName}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        width: '100%',
        aspectRatio: 1,
        flex: 1,
        marginBottom: 10,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: "45%",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    text: {
        fontSize: 20,
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: '#fff',
        fontFamily: "Montserrat_500Medium",
    },
});

export default CategoryListItem;
