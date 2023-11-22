import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';
import { useMainNavigator } from '../../../../redux';

export function InteractiveClassesScreen() {
  const { navigation } = useMainNavigator();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView isSearch isNotification />
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.ACCENT,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
  },
});
