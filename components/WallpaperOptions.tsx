import { ArrowDownToLine, Stamp } from 'lucide-react-native';
import { Alert, Pressable } from 'react-native';
import { useWallpaper } from '../context/WallpaperContext';
import RTNDeviceWallpaper from 'react-native-device-wallpaper-manager/js/NativeDeviceWallpaper';
import * as FileSystem from 'expo-file-system'
import COLORS from '@/constants/COLORS';

const WallpaperOptions = ({
  type,
  url,
  id,
}: {
  type: 'set-wallpaper' | 'download-wallpaper';
  url: string;
  id: string;
}) => {
  const { increaseWallpaperCount } = useWallpaper();

  const setWallpaper = async () => {
    try {
      increaseWallpaperCount(id, 'download');
      console.log('url', url);
      const status = await RTNDeviceWallpaper?.setWallpaper(url, 'both');
      console.log('status', status);
    } catch (error) {
      console.log('Error while setting wallpaper', error);
    }
  };

  const downloadWallpaper = async (imageUrl: string) => {
    // Extract file name from the URL
    const fileName = imageUrl.split('/').pop();
    const directoryPath = `${FileSystem.documentDirectory}wallpaper-app`;
    const downloadPath = `${directoryPath}/${fileName}`;

    try {
      // Check if the directory exists; if not, create it
      const directoryExists = await FileSystem.getInfoAsync(directoryPath);
      if (!directoryExists.exists) {
        await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
      }

      // Download the file to the specified directory
      const result = await FileSystem.downloadAsync(imageUrl, downloadPath);

      if (result.status === 200) {
        Alert.alert('Success', 'Wallpaper saved successfully');
        increaseWallpaperCount(id, 'download');
      } else {
        Alert.alert('Error', 'Failed to save the wallpaper.');
      }
      console.log("Wallpaper saved to: ", downloadPath);
    } catch (error) {
      console.error('Error saving wallpaper:', error);
      Alert.alert('Error', 'An error occurred while saving the wallpaper.');
    }
  };

  return (
    <Pressable
      onPress={() => {
        type === 'set-wallpaper' && setWallpaper();
        type === 'download-wallpaper' && downloadWallpaper(url);
      }}
      style={{
        width: 50,
        aspectRatio: 1 / 1,
        backgroundColor: COLORS.main + "cc",
        borderColor: COLORS.main,
        borderWidth: 2,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.6)"
      }}>
      {type === 'download-wallpaper' && (
        <ArrowDownToLine size={30} color={COLORS.background + "ee"} />
      )}
      {type === 'set-wallpaper' && <Stamp size={30} color={COLORS.background + "ee"} />}
    </Pressable>
  );
};
export default WallpaperOptions;
