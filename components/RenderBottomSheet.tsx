import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useRef, useCallback, useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useWallpaper} from '../context/WallpaperContext';

const RenderBottomSheet = () => {
  const {selectedBottomSheet} = useWallpaper();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  return selectedBottomSheet ? (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      index={0}
      snapPoints={['30%', '50%']}
      onClose={() => {}}>
      <BottomSheetView style={styles.contentContainer}>
        <Text>Yes</Text>
      </BottomSheetView>
    </BottomSheet>
  ) : null;
};

export default RenderBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
