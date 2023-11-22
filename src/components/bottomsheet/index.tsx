import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const screensWidth = Dimensions.get('window').width;

const BottomSheet = ({ children, isVisible, onClose, height = 'auto' }: any) => {
  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      style={styles.container}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropColor={'black'}
      backdropOpacity={0.6}
      onBackdropPress={() => {
        onClose();
      }}
      onBackButtonPress={() => {
        onClose();
      }}
      hideModalContentWhileAnimating={true}>
      <View style={[styles.wrapper, { height: height }]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default React.memo(BottomSheet);
