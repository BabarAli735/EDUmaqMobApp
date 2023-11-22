import React from 'react';
import { SafeAreaView, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../assets';

interface Props {
  children?: React.ReactNode[] | React.ReactNode | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  isSafeArea?: boolean | undefined;
}

export function Container({ children, style, isSafeArea }: Props) {
  return isSafeArea ? (
    <SafeAreaView style={_styles.safe}>
      <StatusBar animated={true} barStyle={'light-content'} translucent={false} backgroundColor={Colors.ACCENT} />
      <View style={[_styles.container, style]}>{children}</View>
    </SafeAreaView>
  ) : (
    <View style={[_styles.container, style]}>{children}</View>
  );
}

const _styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
