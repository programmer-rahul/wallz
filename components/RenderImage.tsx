import COLORS from "@/constants/COLORS";
import { useState } from "react";
import { ActivityIndicator, Image, View, StyleSheet } from "react-native";

const RenderImage = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = url.replace('/upload', '/upload/q_auto,f_auto')

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl, cache: "force-cache" }}
        resizeMode={"cover"}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {!isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size={'large'} color={COLORS.main} />
        </View>
      )}
    </View>
  );
};
export default RenderImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    boxShadow: "0px 0px 4px rgba(0,0,0,.6)",
    borderRadius: 12,
  },
  image: {
    flex: 1,
    borderRadius: 12,
  },
  overlay: {
    height: "100%",
    width: "100%",
    borderRadius: 12,
    backgroundColor: COLORS.icon_neutral + "66",
    borderColor: COLORS.icon_neutral + "88",
    borderWidth: 2,
    zIndex: -10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});