import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../assets';
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from '../../common';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle> | undefined;
  activeOpacity?: number;
  isLoading?: boolean | undefined | false;
  textColor?: string;
  onPress?: () => void;
  titleStyles?: StyleProp<TextStyle> | undefined;
}

export function ButtonView({ title, style, isLoading, onPress, titleStyles }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[_styles.container, style]} onPress={() => !isLoading && onPress && onPress()}>
      <Text style={{ ..._styles.title, color: isLoading === true ? Colors.TRANSPARENT : Colors.WHITE, ...titleStyles }}>{title}</Text>
      <ActivityIndicator animating={isLoading === true} color={Colors.WHITE} style={_styles.indicator} />
    </TouchableOpacity>
  );
}
export function ButtonTabView({ title, style, isLoading, onPress, activeOpacity = 1, textColor = Colors.WHITE }: Props) {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} style={[_styles.container, style]} onPress={() => !isLoading && onPress && onPress()}>
      <Text style={{ ..._styles.title, color: textColor }}>{title}</Text>
      <ActivityIndicator animating={isLoading === true} color={Colors.WHITE} style={_styles.indicator} />
    </TouchableOpacity>
  );
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ACCENT,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:wp(0.5)
  },
  title: {
    fontSize: 18,
    color: Colors.WHITE,
  },
  indicator: {
    position: 'absolute',
    color: Colors.WHITE,
  },
});
