import moment from 'moment';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Icons, Images, ImageView, Strings } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';
import { teacherProfileRequest, useAuthenticationSelector } from '../../../../redux';
import StoreService from '../../../../redux/StoreService';
import { ApiEndpoints } from '../../../../data';

export const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';

export function TeacherMore() {
  const { profile } = useAuthenticationSelector();

  React.useEffect(() => {}, []);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea></Container>
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
  header: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: Colors.TRANSPARENT,
  },
  imageHolder: {
    width: 100,
    height: 100,
    borderRadius: 51,
    // borderWidth: 2,
    // borderColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    // borderWidth: 3,
    // borderColor: Colors.ACCENT,
  },
  name: {
    fontSize: 25,
    marginTop: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  detailItemHolder: {
    marginStart: 30,
    marginEnd: 30,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.L_GRAY,
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  value: {
    flex: 1,
    fontSize: 18,
    color: Colors.PRIMARY,
  },
});
