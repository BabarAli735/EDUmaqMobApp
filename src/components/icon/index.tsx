import React from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../assets';
import { responsiveFontSize as rf, widthPercentageToDP as wp} from '../../common';

interface Props {
  icon: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
  smallButtonColor?: string;
  isLoading?: boolean;
}

export function IconButton({ icon, size, onPress }: Props) {
  return (
    <TouchableOpacity style={_styles.menu} onPress={() => onPress && onPress()}>
      <Image source={icon} style={{ ..._styles.icons, width: size ? size : rf(2.3), height: size ? size : 20 }} />
    </TouchableOpacity>
  );
}
export function SmallIconButton({ icon, size, isLoading, smallButtonColor = 'white', onPress }: Props) {
  return (
    <TouchableOpacity style={{ ..._styles.small, backgroundColor: smallButtonColor }} onPress={() => !isLoading && onPress && onPress()}>
      {!isLoading && <Image source={icon} style={{ ..._styles.smallIcons, width: size ? size : wp(2), height: size ? size : wp(2) }} />}
      <ActivityIndicator animating={isLoading === true} color={Colors.WHITE} style={_styles.indicator} />
    </TouchableOpacity>
  );
}

export function IconButtonMenu({ icon, size, onPress }: Props) {
  return (
    <TouchableOpacity style={_styles.menu} onPress={() => onPress && onPress()}>
      <Image source={icon} style={{ ..._styles.menuIcon, width: size ? size : 20, height: size ? size : 20 }} />
    </TouchableOpacity>
  );
}

const _styles = StyleSheet.create({
  menu: {
    padding: 10,
  },
  small: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 2,
    minWidth: wp(5),
    alignItems:'center',
    justifyContent:'center'
  },
  indicator: {
    position: 'absolute',
    color: Colors.WHITE,
  },
  icons: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
  smallIcons: {
    width: wp(2),
    height: wp(2),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
  menuIcon: {
    padding: 18,
    borderRadius: 20,
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
  },
});
