import {Button, Image, Pressable, Text, View} from 'react-native';

const PreviewScreen = () => {
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#999999',
        flex: 1,
        flexDirection: 'column',
        rowGap: 20,
      }}>
      <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
        <View style={{flex: 1}}>
          <Text>Title</Text>
          <Text>ViewCounts</Text>
        </View>
        <Pressable style={{flex: 0, alignSelf: 'center'}}>
          <Text style={{fontSize: 25}}>Like</Text>
        </Pressable>
      </View>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: 'https://api.slingacademy.com/public/sample-photos/1.jpeg',
          }}
          alt="image"
          resizeMode="cover"
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <WallpaperPreviewOption />
        <WallpaperPreviewOption />
        <WallpaperPreviewOption />
      </View>
    </View>
  );
};

export default PreviewScreen;

const WallpaperPreviewOption = () => {
  return (
    <View
      style={{
        width: '15%',
        aspectRatio: 1 / 1,
        backgroundColor: '#001394',
        borderRadius: '50%',
      }}></View>
  );
};
