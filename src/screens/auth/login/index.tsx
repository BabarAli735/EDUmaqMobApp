import React from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Screens } from '../..';
import { Colors, Images, Strings } from '../../../assets';
import { ButtonView, Container } from '../../../components';
import { useAuthenticationSelector, useAuthNavigator, useInstituteSelector } from '../../../redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export function LoginScreen() {
  const { navigation } = useAuthNavigator();
  const auth = useAuthenticationSelector();
  const institute = useInstituteSelector();

  const [username, setUsername] = React.useState<string>(''); // 2021-03
  const [password, setPassword] = React.useState<string>(''); // 12345
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <KeyboardAvoidingView style={{ flex: 1, height: '100%' }} contentContainerStyle={{ flex: 1 }} behavior={Platform.select({ android: undefined, ios: 'padding' })}>
          <Image source={Images.LOGIN_BANNER} style={_styles.header} />
          <View style={_styles.content}>
            <View style={_styles.titleHolder}>
              {console.log(institute)}
              {institute.institute && institute.institute.institutionCode && (
                <View style={_styles.codeHolder}>
                  <Text style={_styles.code}>{institute.institute?.institutionCode}</Text>
                </View>
              )}
              <Text style={_styles.title}>{institute?.institute?.institutionName || ''}</Text>
            </View>
            <TextInput
              editable={!auth.isLoading}
              style={_styles.input}
              placeholderTextColor={Colors.L_GRAY}
              onChangeText={text => {
                setUsername(text);
              }}
              value={username}
              placeholder={Strings.Login.USERNAME_HINT}
            />
            <View style={_styles.passwordInputBox}>
              <TextInput
                style={_styles.passwordInput}
                secureTextEntry={!passwordVisible}
                editable={!auth.isLoading}
                placeholderTextColor={Colors.L_GRAY}
                onChangeText={text => {
                  setPassword(text);
                }}
                value={password}
                placeholder={Strings.Login.PASSWORD_HINT}
              />
              <MaterialCommunityIcons name={passwordVisible ? 'eye-off' : 'eye'} onPress={handlePasswordVisibility} size={25} style={_styles.togglePass} color="#fff" />
            </View>

            <View style={_styles.forgotPasswordView}>
              <Text style={_styles.forgotPassword} onPress={() => {}}>
                {Strings.Login.FORGOT_PASSWORD}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(Screens.MOBILE, {
                    onMobileVerified: (mobile?: string) => auth.mobileLogin(mobile),
                  });
                }}>
                <Text style={_styles.forgotPassword}>{Strings.Login.MOBILE}</Text>
              </TouchableOpacity>
            </View>

            <ButtonView
              title={Strings.Login.BUTTON}
              style={{ marginTop: 30, width: '60%' }}
              isLoading={auth.isLoading}
              onPress={() => {
                auth.login(username, password);
              }}
            />
            <Text style={_styles.poweredText}>{Strings.Common.POWERED_BY}</Text>

            {/* <ButtonView
              title={Strings.Login.MOBILE}
              style={{ marginTop: 10, width: '100%' }}
              onPress={() => {
                navigation.navigate(Screens.MOBILE, {
                  onMobileVerified: (mobile?: string) => auth.mobileLogin(mobile),
                });
              }}
            />*/}
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
    padding: 50,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    backgroundColor: Colors.PRIMARY,
    position: 'absolute',
    bottom: 0,
  },
  titleHolder: {
    marginTop: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  codeHolder: {
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingStart: 5,
    paddingEnd: 5,
    marginEnd: 5,
    backgroundColor: Colors.WHITE,
  },
  code: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordInput: {
    color: Colors.WHITE,
    padding: 10,
    width: '80%',
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
  passwordInputBox: {
    width: '100%',
    borderRadius: 10,

    fontSize: 16,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: Colors.WHITE,
    color: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPassword: {
    color: Colors.WHITE,
    alignSelf: 'flex-end',
    marginTop: 5,
    fontSize: 16,
  },
  togglePass: {
    alignSelf: 'center',
    margin: 5,
  },
  forgotPasswordView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 4,
  },
  poweredText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 200,
    opacity: 0.7,
  },
  mobile: {
    color: Colors.WHITE,
    marginTop: 30,
    fontSize: 16,
  },
});
