import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets';

interface Props {
  title?: string;
  message?: string;
  icon?: string;
}

export function ComingSoonComponent({ title, message, icon }: Props) {
  return (
    <View style={_styles.container}>
      <Text style={_styles.title}>{title}</Text>
      <Text style={_styles.message}>{message}</Text>
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.WHITE,
  },
  message: {
    fontSize: 16,
    color: Colors.WHITE,
  },
});
