import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useUiSelector } from '../redux';
import { IntroScreen, ItemPicker, LoginScreen, Modals, RegisterScreen, Screens, VerifyInstituteScreen, WelcomeScreen } from '../screens';
import { MobileScreen } from '../screens/auth/mobile';
import {VerifyOTP} from "../screens/auth/verifiyOtp";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  const { isIntroduction } = useUiSelector();

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ animation: 'fade', headerShown: false }}>
        {!isIntroduction && (
          <>
            <Stack.Screen name={Screens.WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={Screens.INTRO} component={IntroScreen} />
          </>
        )}
        <Stack.Screen name={Screens.VERIFY_INSTITUTE} component={VerifyInstituteScreen} />
        <Stack.Screen name={Screens.LOGIN} component={LoginScreen} />
        <Stack.Screen name={Screens.MOBILE} component={MobileScreen} />
        <Stack.Screen name={Screens.OTP_VERIFY} component={VerifyOTP} />
        <Stack.Screen name={Screens.REGISTER} component={RegisterScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'transparentModal', headerShown: false }}>
        <Stack.Screen name={Modals.ITEM_ICKER} component={ItemPicker} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
