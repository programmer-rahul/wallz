import { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

const RenderImage = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = url.replace('/upload', '/upload/q_auto,f_auto')
  return (
    <>
      <Image
        style={{ width: '100%', height: '100%', borderRadius: 6 }}
        source={{ uri: imageUrl, cache: "force-cache" }}
        // src={{

        //   uri: url.replace('/upload', '/upload/q_auto,f_auto'),
        //   // priority: FastImage.priority.normal,
        //   cache: FastImage.cacheControl.immutable,
        // }}
        resizeMode={"cover"}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            left: 20,
            borderRadius: 6,
            backgroundColor: '#bbbbbb88',
            zIndex: -10,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#666666'} />
        </View>
      )}
    </>
  );
};
export default RenderImage;