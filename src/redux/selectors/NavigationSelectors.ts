import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParamsList, DrawerParamsList, MainParamsList } from '../../screens';
import { ModalParamsList } from './../../screens/index';

export function useAuthNavigator() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthParamsList>>();
  const route = useRoute<RouteProp<AuthParamsList>>();

  return { navigation, route };
}

export function useMainNavigator() {
  const navigation = useNavigation<NativeStackNavigationProp<MainParamsList>>();
  const route = useRoute<RouteProp<MainParamsList>>();

  return { navigation, route };
}

export function useDrawerNavigator() {
  const drawer = useNavigation<DrawerNavigationProp<DrawerParamsList>>();
  const route = useRoute<RouteProp<DrawerParamsList>>();

  return { drawer, route };
}

export function useModalNavigator() {
  const navigation = useNavigation<NativeStackNavigationProp<ModalParamsList>>();
  const route = useRoute<RouteProp<ModalParamsList>>();

  return { navigation, route };
}
