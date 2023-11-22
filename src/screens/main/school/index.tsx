import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Icon, Icons, Images, Strings } from '../../../assets';
import { Container, HeaderView } from '../../../components';
import { instituteRequest, useInstituteSelector } from '../../../redux';
import StoreService from '../../../redux/StoreService';
import { ApiEndpoints } from '../../../data';

export function SchoolProfileScreen() {
  const { institute } = useInstituteSelector();

  React.useEffect(() => {
    StoreService.dispatch(instituteRequest({}));
  }, []);
  console.log(institute);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Main.SCHOOL_PROFILE} />
        <ScrollView>
          <Image source={Images.IMG_SCHOOL_BANNER} style={_styles.banner} />
          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: institute?.logoUrl ? ApiEndpoints.BASE_API_URL + institute?.logoUrl : Images.IC_LOGO_I }} style={_styles.logo} />
            <View style={_styles.row}>
              <View style={_styles.badge}>
                <Text style={_styles.code}>{institute?.institutionCode}</Text>
              </View>
              <Text style={_styles.title}>{institute?.institutionname}</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={_styles.section}>
              <Icon icon={Icons.IC_MAP} size={25} />
              <View>
                <Text style={{ ..._styles.label, color: Colors.BLACK }}>{'Address'}</Text>
                <Text style={{ ..._styles.label, marginTop: 10 }}>{institute?.institutionname}</Text>
                <Text style={{ ..._styles.label, marginTop: 5 }}>{(institute?.addressLocation + ' ' + institute?.city + ' ' + institute?.state + ' ' + institute?.country).trim()}</Text>
              </View>
            </View>
            <View style={_styles.section}>
              <Icon icon={Icons.IC_PHONE} size={25} />
              <View>
                <Text style={{ ..._styles.label, color: Colors.BLACK }}>{'Contact Details'}</Text>
                <Text style={{ ..._styles.label, marginTop: 10 }}>
                  {(institute?.telephone ? institute?.telephone : '') + (institute?.telephone && institute?.contactNumber ? ' / ' : '') + (institute?.contactNumber ? institute?.contactNumber : '')}
                </Text>
              </View>
            </View>
            {institute?.emailId ? (
              <View style={_styles.section}>
                <Icon icon={Icons.IC_EMAIL} size={25} />
                <View>
                  <Text style={{ ..._styles.label, color: Colors.BLACK }}>{'Email'}</Text>
                  <Text style={{ ..._styles.label, marginTop: 10 }}>{institute?.emailId}</Text>
                </View>
              </View>
            ) : null}
            {institute?.websiteURL ? (
              <View style={_styles.section}>
                <Icon icon={Icons.IC_INTERNET} size={25} />
                <View>
                  <Text style={{ ..._styles.label, color: Colors.BLACK }}>{'Website'}</Text>
                  <Text style={{ ..._styles.label, marginTop: 10 }}>{institute?.websiteURL}</Text>
                </View>
              </View>
            ) : null}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  banner: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.GRAY,
  },
  logo: {
    width: 150,
    height: 150,
    alignItems: 'center',
    resizeMode: 'contain',
    marginTop: -75,
    backgroundColor: Colors.TRANSPARENT,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  code: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.WHITE,
  },
  badge: {
    backgroundColor: Colors.ACCENT,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 6,
  },
  section: {
    padding: 20,
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    marginStart: 15,
    opacity: 0.7,
    fontWeight: 'bold',
    color: '#3B3B3B',
  },
});
