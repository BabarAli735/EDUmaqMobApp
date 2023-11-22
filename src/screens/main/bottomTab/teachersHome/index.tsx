import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icons, Images, ImageView } from '../../../../assets';
import { Container, HeaderView, VirtualizedList } from '../../../../components';
import { logout, useAuthenticationSelector, useInstituteSelector, useMainNavigator } from '../../../../redux';
import { TeacherModules } from '../../../../utils';
import { ApiEndpoints } from '../../../../data';

import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { responsiveFontSize as rf, widthPercentageToDP as wp } from '../../../../common';

//const image = 'https://media-exp1.licdn.com/dms/image/C5103AQElCB2OnJTc1A/profile-displayphoto-shrink_800_800/0/1536736351378?e=1636588800&v=beta&t=IdcbKD0QbnWl6PabUe8ud_N93zBfyoDLWdOGLbAmsJ4';

export function TeacherHomeScreen() {
  const { navigation } = useMainNavigator();

  const { profile } = useAuthenticationSelector();
  const { institute } = useInstituteSelector();
  console.log(profile);
  //   const {imageUrl:imageURI}=profile
  useEffect(() => {}, []);
  const { height } = useWindowDimensions();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <Image source={Images.IMG_PATTERN_HEADER} style={{ width: '200%', height: '50%', position: 'absolute', opacity: 0.3, resizeMode: 'cover' }} />
        <HeaderView isDrawer isSearch isNotification color={Colors.TRANSPARENT} />
        <VirtualizedList>
          <>
            <View style={{ alignItems: 'center' }}>
              <View style={_styles.header}>
                <View style={_styles.imageHolder}>
                  <ImageView icon={profile?.imageURI ? ApiEndpoints.BASE_API_URL + profile?.imageURI : Icons.IC_USER} style={_styles.image} />
                </View>
                <Text style={_styles.name}>Hi, {profile?.userName ?? profile?.employeeName}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={_styles.codeHolder}>
                    <Text style={_styles.code}>{institute?.institutionCode}</Text>
                  </View>
                  <Text style={_styles.institute}>{institute?.institutionName}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
              <FlatList
                numColumns={3}
                data={TeacherModules}
                style={{ backgroundColor: Colors.PRIMARY, paddingBottom: 20 }}
                ListHeaderComponent={<Text style={{ color: Colors.WHITE, fontSize: rf(2.5), fontWeight: '500', paddingTop: 5 }}>TEACHER MODULE</Text>}
                ListHeaderComponentStyle={{ alignItems: 'center' }}
                // contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={_styles.itemContainer}
                      onPress={() => {
                        navigation.navigate(item.id as any);
                      }}>
                      <View style={{ ..._styles.iconHolder }}>
                        <ImageView icon={item.icon} size={60} />
                      </View>
                      <Text style={_styles.nameModule} numberOfLines={2}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </>
        </VirtualizedList>
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
    width: '100%',
    paddingBottom: 10,
    alignItems: 'center',
  },
  imageHolder: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(35),
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  name: {
    fontSize: rf(2.8),
    marginTop: 10,
    color: Colors.WHITE,
  },
  codeHolder: {
    borderRadius: 5,
    paddingStart: 5,
    paddingEnd: 5,
    marginEnd: 5,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  code: {
    fontSize: rf(0.9),
    fontWeight: 'bold',
    color: Colors.ACCENT,
  },
  institute: {
    fontSize: rf(1.4),
    color: Colors.WHITE,
  },

  iconHolder: {
    padding: 12,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#aaa',
    shadowOpacity: 1,
    elevation: 2,
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
  },
  nameModule: {
    fontSize: rf(1.5),
    marginTop: 8,
    textAlign: 'center',
    color: Colors.WHITE,
    textAlignVertical: 'center',
  },

  title: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  itemContainer: {
    flex: 1,
    marginEnd: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});
