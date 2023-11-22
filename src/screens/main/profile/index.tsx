import moment from 'moment';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Icons, Images, ImageView, Strings } from '../../../assets';
import { Container, HeaderView } from '../../../components';
import { profileRequest, teacherProfileRequest, useAuthenticationSelector } from '../../../redux';
import StoreService from '../../../redux/StoreService';
import { ApiEndpoints } from '../../../data';

export const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';

export function ProfileScreen() {
  const { profile } = useAuthenticationSelector();

  React.useEffect(() => {
    StoreService.dispatch(teacherProfileRequest({ id: profile?.id ?? 0 }));
  }, []);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <Image source={Images.IMG_PATTERN_HEADER} style={{ width: '200%', height: '50%', position: 'absolute', opacity: 0.3, resizeMode: 'cover' }} />
        <HeaderView title={Strings.Profile.TITLE} isSearch isNotification color={Colors.TRANSPARENT} />
        <View style={_styles.header}>
          <View style={_styles.imageHolder}>
            <ImageView icon={profile?.imageUrl && profile?.imageUrl.length > 0 ? ApiEndpoints.BASE_API_URL + profile?.imageUrl : Icons.IC_USER} style={_styles.image} />
          </View>
          <Text style={_styles.name}>{profile?.userName ?? profile?.studentName}</Text>
        </View>
        <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }} showsVerticalScrollIndicator={false} scrollEnabled contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <View style={{ ..._styles.detailItemHolder, marginTop: 30, borderBottomWidth: 0 }}>
              <Text style={_styles.label}>{Strings.Profile.ADMISSION_NO}</Text>
              <Text style={_styles.value}>{profile?.admissionNo ? profile?.admissionNo : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.CLASS}</Text>
              <Text style={_styles.value}>{profile?.classCourseName ?? profile?.className ?? '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.ROLL_NO}</Text>
              <Text style={_styles.value}>{profile?.rollNo ? profile?.rollNo : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.DOB}</Text>
              <Text style={_styles.value}>{profile?.dob ? moment(new Date(profile?.dob)).format('DD-MM-YYYY') : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.FATHER}</Text>
              <Text style={_styles.value}>{profile?.fatherName ? profile?.fatherName : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.MOBILE_NO}</Text>
              <Text style={_styles.value}>{profile?.fatherMobileNo ? profile?.fatherMobileNo : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.MOTHER}</Text>
              <Text style={_styles.value}>{profile?.motherFullName ? profile?.motherFullName : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.MOBILE_NO}</Text>
              <Text style={_styles.value}>{profile?.motherMobileNumber ? profile?.motherMobileNumber : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.BLOOD_GROUP}</Text>
              <Text style={_styles.value}>{profile?.bloodGroup ? profile?.bloodGroup : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.Profile.ADDRESS}</Text>
              <Text style={_styles.value}>{profile?.permenantFullAddress ? profile?.permenantFullAddress : '-'}</Text>
            </View>
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
    backgroundColor: Colors.ACCENT,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: Colors.TRANSPARENT,
  },
  imageHolder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.ACCENT,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 12,
    color: Colors.WHITE,
  },
  detailItemHolder: {
    marginStart: 20,
    marginEnd: 20,
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
