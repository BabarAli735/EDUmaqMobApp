import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../assets';

interface Props {
  isLoading?: boolean;
  color?: string | undefined;
  size?: number | 'small' | 'large' | undefined;
}

export function LoadingIndicator({ isLoading, color, size }: Props) {
  return <ActivityIndicator animating={isLoading} size={size ? size : 'large'} color={color ? color : Colors.WHITE} />;
}