import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import FastImage from "react-native-fast-image";

const RenderImage = ({url}: {url: string}) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <>
        <FastImage
          style={{width: '100%', height: '100%', borderRadius: 6}}
          source={{
            uri: url.replace('/upload', '/upload/q_auto,f_auto'),
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && (
          <View
            style={{
              width: '100%',
              height: '100%',
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