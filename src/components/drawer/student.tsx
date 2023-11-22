import { DrawerActions } from '@react-navigation/core';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, HorizontalDivider } from '..';
import { version } from '../../../package.json';
import { Colors, Icon, Icons, ImageView, Strings } from '../../assets';
import { useAuthenticationSelector, useDrawerNavigator, useMainNavigator } from '../../redux';
import { Screens } from '../../screens';
import { ApiEndpoints } from '../../data';

const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';
export default function Student() {
  const { navigation } = useMainNavigator();
  const { drawer } = useDrawerNavigator();
  const { profile, logOut } = useAuthenticationSelector();

  return (
    <Container style={_styles.container}>
      {/* <ImageBackground source={Images.IMG_DRAWER_BANNER} style={{ width: '100%', backgroundColor: Colors.ACCENT }}> */}
      <TouchableOpacity
        activeOpacity={1}
        style={{ ..._styles.header, backgroundColor: Colors.ACCENT }}
        onPress={() => {
          navigation.navigate(Screens.PROFILE);
          drawer.dispatch(DrawerActions.closeDrawer());
        }}>
        <View style={{ flexDirection: 'row', paddingTop: 0 }}>
          <View style={_styles.imageHolder}>
            <ImageView icon={profile?.imageUrl ? ApiEndpoints.BASE_API_URL + profile?.imageUrl : Icons.IC_USER} style={_styles.image} />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={_styles.name}>{profile?.userName ?? profile?.studentName}</Text>
            <Text style={_styles.class}>{'STD: ' + (profile?.classCourseName ?? profile?.className) + ' ' + profile?.batchName}</Text>
            <Text style={_styles.role}>{'Roll No.: ' + profile?.rollNo}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* </ImageBackground> */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ ..._styles.menu, backgroundColor: Colors.L_GRAY, marginTop: 10 }} onPress={() => drawer.dispatch(DrawerActions.closeDrawer())}>
          <Icon icon={Icons.IC_HOME} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.HOME}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={_styles.menu}
          onPress={() => {
            navigation.navigate(Screens.PROFILE);
            drawer.dispatch(DrawerActions.closeDrawer());
          }}>
          <Icon icon={Icons.IC_PROFILE} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.PROFILE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={_styles.menu}
          onPress={() => {
            navigation.navigate(Screens.SCHOOL_PROFILE);
            drawer.dispatch(DrawerActions.closeDrawer());
          }}>
          <Icon icon={Icons.IC_SCHOOL_PROFILE} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.SCHOOL_PROFILE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={_styles.menu}
          onPress={() => {
            navigation.navigate(Screens.FEEDBACK);
            drawer.dispatch(DrawerActions.closeDrawer());
          }}>
          <Icon icon={Icons.IC_WRITE_TO_SCHOOL} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.WRITE_TO_SCHOOL}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={_styles.menu}
          onPress={() => {
            navigation.navigate(Screens.ABOUT_APP);
            drawer.dispatch(DrawerActions.closeDrawer());
          }}>
          <Icon icon={Icons.IC_ABOUT_APP} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.ABOUT_APP}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={_styles.menu}
          onPress={() => {
            navigation.navigate(Screens.SETTINGS);
            drawer.dispatch(DrawerActions.closeDrawer());
          }}>
          <Icon icon={Icons.IC_APP_SETTINGS} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.SETTINGS}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={_styles.menu}
          onPress={() => {
            navigation.navigate(Screens.SWITCH_PROFILE);
            drawer.dispatch(DrawerActions.closeDrawer());
          }}>
          <Icon icon={Icons.IC_SWITCH_PROFILE} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.SWITCH_PROFILE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ..._styles.menu, marginBottom: 10 }}
          onPress={() => {
            drawer.dispatch(DrawerActions.closeDrawer());
            Alert.alert(Strings.Common.LOGOUT, Strings.Common.LOGOUT_MESSAGE, [
              { text: Strings.Common.CANCEL, style: 'cancel' },
              { text: Strings.Common.LOGOUT, style: 'destructive', onPress: () => logOut() },
            ]);
          }}>
          <Icon icon={Icons.IC_LOGOUT} size={17} color={Colors.PRIMARY} />
          <Text style={_styles.menuText}>{Strings.Main.LOGOUT}</Text>
        </TouchableOpacity>
      </View>
      <HorizontalDivider width={1} color={Colors.L_GRAY} />
      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
        <Text style={_styles.powered}>{Strings.Common.POWERED_BY}</Text>
        <Text style={_styles.powered}>{'V' + version}</Text>
      </View>
    </Container>
  );
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  header: {
    width: '100%',
    padding: 20,
    paddingTop: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  class: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 5,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  role: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 5,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  menu: {
    padding: 13,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginStart: 10,
    color: Colors.PRIMARY,
  },
  powered: {
    fontSize: 14,
    opacity: 0.7,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageHolder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
});
