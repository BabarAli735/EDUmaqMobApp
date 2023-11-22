import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../assets';

interface Props {
  color?: string;
  width?: number;
}

export function HorizontalDivider({ color, width }: Props) {
  return <View style={{ backgroundColor: color, height: width ? width : 1, width: '100%' }} />;
}

export function VerticalDivider({ color, width }: Props) {
  return <View style={{ backgroundColor: color, width: width ? width : 1, height: '100%' }} />;
}
