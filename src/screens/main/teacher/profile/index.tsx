import moment from 'moment';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Icons, Images, ImageView, Strings } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';
import { teacherProfileRequest, useAuthenticationSelector } from '../../../../redux';
import StoreService from '../../../../redux/StoreService';
import { ApiEndpoints } from '../../../../data';
import { responsiveFontSize as rf, widthPercentageToDP as wp } from '../../../../common';

export const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';

export function TeacherProfileScreen() {
  const { profile } = useAuthenticationSelector();

  React.useEffect(() => {
    StoreService.dispatch(teacherProfileRequest({ id: profile?.id ?? 0 }));
  }, []);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <Image source={Images.IMG_PATTERN_TEACHER} style={{ width: '200%', height: '50%', position: 'absolute', opacity: 0.3, resizeMode: 'cover' }} />
        <HeaderView isSearch isNotification color={Colors.TRANSPARENT} />
        <View style={_styles.header}>
          <View style={_styles.imageHolder}>
            <ImageView icon={profile?.imageURI && profile?.imageURI.length > 0 ? ApiEndpoints.BASE_API_URL + profile?.imageURI : Icons.IC_USER} style={_styles.image} />
          </View>
          <Text style={_styles.name}>{profile?.userName ?? profile?.employeeName}</Text>
        </View>
        <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }} showsVerticalScrollIndicator={false} scrollEnabled contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={{ backgroundColor: Colors.CYAN, flex: 1 }}>
            <View style={{ ..._styles.detailItemHolder, marginTop: 30 }}>
              <Text style={_styles.label}>{Strings.TeacherProfile.EPM_ID}</Text>
              <Text style={_styles.value}>{profile?.employeeId ? profile?.employeeId : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.GENDER}</Text>
              <Text style={_styles.value}>{profile?.gender ?? profile?.gender ?? '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.DATE_OF_BIRTH}</Text>
              <Text style={_styles.value}>{profile?.dateOfBirth ? moment(new Date(profile?.dateOfBirth)).format('DD-MM-YYYY') : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.MOBILE_NO}</Text>
              <Text style={_styles.value}>{profile?.mobileNo ? profile?.mobileNo : '-'}</Text>
            </View>

            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.EMAIL_ID}</Text>
              <Text style={_styles.value}>{profile?.emailId ? profile?.emailId : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.DEPARTMENT}</Text>
              <Text style={_styles.value}>{profile?.department ? profile?.department : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.DESIGNATION}</Text>
              <Text style={_styles.value}>{profile?.designation ? profile?.designation : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.JOINING_DATE}</Text>
              <Text style={_styles.value}>{profile?.joinDate ? moment(new Date(profile?.joinDate)).format('DD-MM-YYYY') : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.BLOOD_GROUP}</Text>
              <Text style={_styles.value}>{profile?.bloodGroup ? profile?.bloodGroup : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.ADHAAR_No}</Text>
              <Text style={_styles.value}>{profile?.adhaarNumber ? profile?.adhaarNumber : '-'}</Text>
            </View>
            <View style={_styles.detailItemHolder}>
              <Text style={_styles.label}>{Strings.TeacherProfile.ADDRESS}</Text>
              <Text style={_styles.value}>{profile?.permanentAddress ? profile?.permanentAddress : '-'}</Text>
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
    backgroundColor: Colors.PRIMARY,
  },
  header: {
    alignItems: 'center',
    paddingBottom: wp(4),
    backgroundColor: Colors.TRANSPARENT,
  },
  imageHolder: {
    width: wp(35),
    height: wp(35),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp(35),
  },
  name: {
    fontSize: rf(2.8),
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
    fontSize: rf(2),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  value: {
    flex: 1,
    fontSize: rf(2),
    color: Colors.PRIMARY,
  },
});
