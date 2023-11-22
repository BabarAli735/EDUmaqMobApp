import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Screens } from '../..';
import { Colors, Images } from '../../../assets';
import { ButtonView, Container } from '../../../components';
import { useAuthNavigator } from '../../../redux';

export function WelcomeScreen() {
  const { navigation } = useAuthNavigator();
  return (
    <Container style={{ backgroundColor: Colors.WHITE }}>
      <View style={_styles.header}>
        <Image resizeMethod={'scale'} style={_styles.image} source={Images.IMG_WELCOME}  />
      </View>
      <View style={_styles.footer}>
        <View style={_styles.content}>
          <Text style={_styles.title}>{'Welcome to'}</Text>
          <Text style={{ ..._styles.title, fontSize: 30 }}>{'EduConnect'}</Text>
        </View>
        <Text style={_styles.title}>{'Stay on Top of all that is happening\nat your School'}</Text>
        <ButtonView title={'Get Started'} style={_styles.button} onPress={() => navigation.navigate(Screens.INTRO)} />
      </View>
    </Container>
  );
}

const _styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '70%',
    paddingTop:0,
   // paddingBottom: 15,
    backgroundColor: Colors.WHITE,
  },
  footer: {
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    backgroundColor: Colors.PRIMARY,
    position:'absolute',
    bottom:0,
    width:'100%'
  },

  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
    top: 30,
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    bottom: 40,
  },
});
