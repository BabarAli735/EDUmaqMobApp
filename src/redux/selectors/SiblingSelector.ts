import React from 'react';
import { useSelector } from 'react-redux';
import { Store, loginRequest, loginSuccess, profileRequest, siblingRequest, switchSiblingRequest, useMainNavigator, useUiSelector } from '..';
import { Profile, setUserProfile } from '../../data';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { useAuthenticationSelector } from './AuthSelectors';
import { switchSiblingProfile } from '../sagas';
import { Alert } from 'react-native';

const siblingStateSelector = (state: RootState) => state.siblings;

export const useSiblingSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { navigation } = useMainNavigator();
  const { isLoading, siblings, error } = useSelector(siblingStateSelector);
  const { showSnackbar } = useUiSelector();
  React.useEffect(() => {
    StoreService.dispatch(siblingRequest({ id: profile?.id ?? 0 }));
  }, []);

  const onRetry = () => {
    StoreService.dispatch(siblingRequest({ id: profile?.id ?? 0 }));
  };

  const onSwitchUser = (data: Profile) => {
//    
console.log(data)
// alert()
    StoreService.dispatch(loginRequest({ email: data?.userName ,password:data?.password }));
    // setUserProfile(data);
    // StoreService.dispatch(loginSuccess(data));
    navigation.goBack();
  };

  return { isLoading, siblings, error, onRetry, onSwitchUser };
};
