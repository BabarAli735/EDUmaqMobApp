import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Icons, Images, Strings } from '../../assets';
import { Container } from '../../components';

export function SplashScreen() {
  return (
    <Container style={_styles.container}>
      <View style={_styles.logoHolder}>
        <Image source={Images.IC_LOGO_I} style={_styles.logo} />
      </View>
      <View style={_styles.footer}>
        <View style={_styles.footerMenu}>
          <Image source={Icons.IC_PARTNER} style={{ ..._styles.icon, width: 45, height: 45, marginBottom: -10 }} />
          <Text numberOfLines={2} style={_styles.text}>
            {Strings.Splash.PARTNER}
          </Text>
        </View>
        <View style={_styles.footerMenu}>
          <Image source={Icons.IC_PROTECTED} style={_styles.icon} />
          <Text numberOfLines={2} style={_styles.text}>
            {Strings.Splash.PROTECTED}
          </Text>
        </View>
        <View style={_styles.footerMenu}>
          <Image source={Icons.IC_SEGMENT} style={_styles.icon} />
          <Text numberOfLines={2} style={_styles.text}>
            {Strings.Splash.SEGMENT}
          </Text>
        </View>
      </View>
    </Container>
  );
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoHolder: {
    width: 200,
    height: 200,
    padding: 10,
    borderRadius: 100,
    backgroundColor: Colors.WHITE,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  footerMenu: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    start: 0,
    end: 0,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 5,
    color: Colors.WHITE,
  },
});
