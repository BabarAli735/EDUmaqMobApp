import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../assets';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../common';

interface Props {
  title: string;
  titleStyle?: StyleProp<TextStyle> | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  isLoading?: boolean | undefined | false;
  onPress?: () => void;
}

export function SmallButtonView({ title, titleStyle, style, isLoading, onPress }: Props) {
  return (
    <TouchableOpacity style={[_styles.container, style]} onPress={() => !isLoading && onPress && onPress()}>
      <Text style={[{ ..._styles.title, color: isLoading === true ? Colors.TRANSPARENT : Colors.WHITE }, titleStyle]}>{title}</Text>
      <ActivityIndicator animating={isLoading === true} color={Colors.WHITE} style={_styles.indicator} />
    </TouchableOpacity>
  );
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ACCENT,
    width: wp(18),
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:hp(0.7)
  },
  title: {
    fontSize: 12,
    color: Colors.WHITE,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    color: Colors.WHITE,
  },
});
