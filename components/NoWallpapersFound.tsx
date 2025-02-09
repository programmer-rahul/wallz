import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GalleryHorizontalEnd } from 'lucide-react-native';
import COLORS from "@/constants/COLORS";
import { router } from "expo-router";

const NoWallpapersFound = ({ category }: { category: string }) => {
    const message = category === "favourite" ? "No favourite wallpapers found" : "No wallpapers found";

    const handlePress = () => {
        category === "favourite" && router.push("/")
    };

    return (
        <View style={styles.container}>
            <GalleryHorizontalEnd size={100} color={COLORS.icon_neutral + "dd"} />
            <Text style={styles.message}>{message}</Text>
            {
                category === "favourite" && <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Browse Wallpapers</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    message: {
        fontSize: 18,
        color: COLORS.secondary_text + "aa",
        textAlign: "center",
        marginVertical: 10,
    },
    button: {
        backgroundColor: COLORS.icon_neutral,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: COLORS.btn_text,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default NoWallpapersFound;
