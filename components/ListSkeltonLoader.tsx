import COLORS from "@/constants/COLORS";
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CardItemSkeltonLoader from "./CardItemSkeltonLoader";


const ListSkeltonLoader = ({ noOfItem, cardType }: { noOfItem: number, cardType: "wallpaper" | "category" }) => {
    return (
        <FlatList
            style={styles.flatList}
            data={Array.from({ length: noOfItem }, (_, i) => i)}
            renderItem={({ }) => {
                return (
                    <View
                        style={{
                            flex: 1,
                            aspectRatio: cardType === "wallpaper" ? 9 / 16 : 1 / 1,
                            borderRadius: 12,
                            position: "relative",
                        }}>
                        <CardItemSkeltonLoader />
                    </View>);
            }}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
        />)
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column',
        gap: 10,
        flex: 1,
    },
    title: {
        fontSize: 30,
        textTransform: 'capitalize',
        color: COLORS.primary_text,
        fontFamily: 'Montserrat_500Medium',
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
        padding: 4
    },
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 10,
    },
    contentContainer: {
        gap: 10,
    },
    footer: {
        paddingBottom: 20,
    },
});

export default ListSkeltonLoader