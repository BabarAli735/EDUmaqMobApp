import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icon, Icons, Images, Strings } from '../../../assets';
import { Container, HeaderView } from '../../../components';

export function PaymentHistoryScreen() {
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.More.PAYMENT_HISTORY} />
        <View style={_styles.details}>
          <View style={_styles.header}>
            <Image source={Images.IC_LOGO_I} style={_styles.logo} />
            <Text style={{ ..._styles.content, fontWeight: 'bold' }}>{'Version 1.0.1'}</Text>
          </View>
          <ScrollView style={{ flex: 1, marginTop: 20 }}>
            <Text style={{ ..._styles.content }}>{Strings.AboutApp.DETAILS}</Text>
          </ScrollView>
          <Text style={{ ..._styles.content, fontWeight: 'bold' }}>{Strings.AboutApp.FOLLOW_US}</Text>
          <View style={{ ..._styles.header, marginTop: 20 }}>
            <TouchableOpacity style={{ padding: 10 }}>
              <Icon icon={Icons.IC_FACEBOOK} size={30} color={Colors.GRAY} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, marginStart: 20, marginEnd: 20 }}>
              <Icon icon={Icons.IC_LINKED_IN} size={30} color={Colors.GRAY} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 12.5 }}>
              <Icon icon={Icons.IC_PLAY} size={25} color={Colors.GRAY} />
            </TouchableOpacity>
          </View>
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
    backgroundColor: Colors.WHITE,
  },
  logo: {
    width: 100,
    height: 40,
    marginEnd: 20,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    fontSize: 18,
    color: Colors.BLACK,
    textAlign: 'justify',
  },
});
