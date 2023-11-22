import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonView } from '..';
import { Colors, Strings } from '../../assets';

interface Props {
  isRetry?: boolean | undefined;
  message?: string | undefined;
  onRetry?: () => void;
}

export function ErrorIndicator({ isRetry, message, onRetry }: Props) {
  return (
    <View style={_styles.container}>
      <Text style={_styles.error}>{message}</Text>
      {isRetry && message ? <ButtonView title={Strings.Common.RETRY} isLoading={false} style={{ marginTop: 20 }} onPress={() => onRetry && onRetry()} /> : <View />}
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: Colors.WHITE,
  },
});
