import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import { Colors } from '../assets';
import { useAuthenticationSelector, useUiSelector } from '../redux';
import { Screens, SplashScreen } from '../screens';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const [isAppLoading, setAppLoading] = React.useState<boolean>(true);
  const ui = useUiSelector();

  const { isAuthenticated } = useAuthenticationSelector();

  React.useEffect(() => {
    setTimeout(() => setAppLoading(false), 3000);
  }, []);

  React.useEffect(() => {
    if (ui.isSnackbar && ui.message) {
      setTimeout(() => {
        ui.hideSnackbar();
      }, 3000);
    }
  }, [ui.isSnackbar, ui.message]);

  return (
    <NavigationContainer>
      <StatusBar animated={true} barStyle={'light-content'} translucent={false} backgroundColor={Colors.PRIMARY} />
      {isAppLoading ? (
        <Stack.Navigator screenOptions={{ animation: 'fade', headerShown: false }}>
          <Stack.Screen name={Screens.SPLASH} component={SplashScreen} />
        </Stack.Navigator>
      ) : !isAuthenticated ? (
        <AuthNavigator />
      ) : (
        <MainNavigator />
      )}
      <SnackBar visible={ui.isSnackbar} textMessage={ui.message} backgroundColor={ui.isSnackbar && ui.isError ? Colors.ACCENT : Colors.MESSAGE} />
    </NavigationContainer>
  );
}
