import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';

export function SearchScreen() {
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Search.TITLE} isNotification />
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
