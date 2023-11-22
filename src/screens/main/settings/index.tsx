import React from 'react';
import { Linking, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Rate, { AndroidMarket } from 'react-native-rate';
import { Screens } from '../..';
import { Colors, Icon, Icons, Strings } from '../../../assets';
import { Container, HeaderView } from '../../../components';
import { useMainNavigator } from '../../../redux';

export function SettingsScreen() {
  const { navigation } = useMainNavigator();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Main.SETTINGS} />
        <View style={{ padding: 20 }}>
          <TouchableOpacity style={[_styles.menuContainer]} onPress={() => navigation.navigate(Screens.CHANGE_PASSWORD)}>
            <Icon icon={Icons.IC_LOCK} size={20} color={Colors.PRIMARY} />
            <Text style={_styles.menuName}>{'Change Password'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[_styles.menuContainer]}
            onPress={() => {
              Linking.openURL('https://play.google.com/store/apps/details?id=com.edumaq');
            }}>
            <Icon icon={Icons.IC_STAR} size={20} color={Colors.PRIMARY} />
            <Text style={_styles.menuName}>{'Rate Us'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={_styles.menuContainer}
            onPress={async () => {
              try {
                const result = await Share.share({
                  title: 'App link',
                  message: 'Please install this app and stay safe',
                  url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error: any) {
                alert(error.message);
              }
            }}>
            <Icon icon={Icons.IC_SHARE} size={20} color={Colors.PRIMARY} />
            <Text style={_styles.menuName}>{'Refer with Friend'}</Text>
          </TouchableOpacity>
        </View>
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
  menuContainer: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
  },
  menuName: {
    flex: 1,
    fontSize: 18,
    marginStart: 10,
    color: Colors.PRIMARY,
  },
});
function alert(message: any) {
  throw new Error('Function not implemented.');
}
