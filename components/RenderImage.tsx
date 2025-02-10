import { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import CardItemSkeltonLoader from "./CardItemSkeltonLoader";

const RenderImage = ({ url, onLoad = () => { } }: { url: string, onLoad?: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = url.replace('/upload', '/upload/q_auto,f_auto')

  useEffect(() => {
    if (!isLoading) {
      onLoad();
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl, cache: "force-cache" }}
        resizeMode={"cover"}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && <CardItemSkeltonLoader />}
    </View>
  );
};
export default RenderImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    borderRadius: 12,
    elevation: 4,
  },
  image: {
    flex: 1,
    borderRadius: 12,
  },
});