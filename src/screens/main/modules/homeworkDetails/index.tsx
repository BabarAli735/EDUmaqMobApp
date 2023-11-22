import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';

export function HomeWorkDetails({route}: any) {
  const {item} = route.params;
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={item.homeWorkTitle} isSearch isNotification />
        <ScrollView>
          <View>
            <Text style={{margin:30}}>{item.homeWorkText}</Text>
          </View>
        </ScrollView>

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
    backgroundColor: Colors.WHITE,
  },
});
