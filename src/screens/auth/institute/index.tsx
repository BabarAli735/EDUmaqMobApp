import React from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screens } from '../..';
import { Colors, Icons, Images, Strings } from '../../../assets';
import { ButtonView, Container } from '../../../components';
import { useAuthNavigator, useInstituteSelector } from '../../../redux';

export function VerifyInstituteScreen() {
  const { navigation } = useAuthNavigator();

  const [code, setCode] = React.useState<string>(''); // 00100
  const { isLoading, verify } = useInstituteSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} contentContainerStyle={{ flex: 1 }} behavior={Platform.select({ android: undefined, ios: 'padding' })}>
          <Image source={Images.IC_AUTH_HEADER} style={_styles.header} />
          <View style={_styles.content}>
            <Text style={_styles.title}>{Strings.Institute.VERIFY_TITLE}</Text>
            <TextInput keyboardType={'number-pad'} editable={!isLoading} style={_styles.input} placeholderTextColor={Colors.L_GRAY} onChangeText={text => setCode(text)} value={code} placeholder={Strings.Institute.VERIFY_CODE_HINT} />
            <ButtonView
              title={Strings.Institute.VERIFY_BUTTON}
              style={{ marginTop: 30 }}
              isLoading={isLoading}
              onPress={() => {
                verify(code, () => {
                  if (!isLoading) {
                    navigation.navigate(Screens.LOGIN);
                  }
                });
              }}
            />
            <Text style={_styles.institute} onPress={() => navigation.navigate(Screens.REGISTER)}>
              {Strings.Institute.REGISTER}
            </Text>
            <View style={_styles.footer}>
              <View style={_styles.helpContainer}>
                <Image source={Icons.IC_GRAPH} style={_styles.helpIcon} />
                <Text style={_styles.helpText}>{Strings.Institute.SUPPORT}</Text>
              </View>
              <Text style={_styles.poweredText}>{Strings.Common.POWERED_BY}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: Colors.PRIMARY,
  },
  container: {
    // backgroundColor: Colors.PRIMARY,
  },
  header: {
    backgroundColor: Colors.WHITE,
    height: '65%',
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '45%',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    backgroundColor: Colors.PRIMARY,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: Colors.WHITE,
    color: Colors.WHITE,
  },
  footer: {
    alignItems: 'center',
  },
  helpContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  helpIcon: {
    width: 20,
    height: 20,
  },
  helpText: {
    color: Colors.WHITE,
    fontSize: 16,
    marginStart: 10,
    opacity: 0.7,
  },
  poweredText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 40,
    opacity: 0.7,
  },
  institute: {
    color: Colors.WHITE,
    marginTop: 30,
    fontSize: 16,
  },
});
