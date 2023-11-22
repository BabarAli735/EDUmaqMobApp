import React from 'react';
import { useSelector } from 'react-redux';
import { loginMobileRequest, loginRequest, logout, useMainNavigator, useUiSelector } from '..';
import { changePassword } from '../../data';
import { responseError } from '../../utils';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { BaseResponse } from './../../data/model/BaseResponse';

const authStateSelector = (state: RootState) => state.auth;

export const useAuthenticationSelector = () => {
  const { isLoading, profile, error } = useSelector(authStateSelector);
  const { showSnackbar } = useUiSelector();

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  const login = (username: string, password: string) => {
    if (!username) {
      showSnackbar('Username should not be empty.', true);
    } else if (!password) {
      showSnackbar('Password should not be empty.', true);
    } else {
      StoreService.dispatch(loginRequest({ email: username, password: password }));
    }
  };

  const mobileLogin = (mobile?: string) => {
    if (mobile) {
      StoreService.dispatch(loginMobileRequest({ mobile: mobile }));
    }
  };

  const logOut = () => {
    StoreService.dispatch(logout());
  };

  return { isLoading, isAuthenticated: !!profile, profile, error, mobileLogin, login, logOut };
};

export const useChangePasswordSelector = () => {
  const { navigation, route } = useMainNavigator();
  const [isLoading, setLoading] = React.useState(false);
  const { profile } = useAuthenticationSelector();
  const { showSnackbar } = useUiSelector();

  const onChangePassword = (oldPassword?: string, newPassword?: string, confirmPassword?: string) => {
    if (!oldPassword || oldPassword === '') {
      showSnackbar('Please enter old password.');
    } else if (!newPassword || newPassword === '') {
      showSnackbar('Please enter new password.');
    } else if (oldPassword === newPassword) {
      showSnackbar('New password should not be same as old password.');
    } else if (!confirmPassword || confirmPassword === '') {
      showSnackbar('Please enter confirm password.');
    } else if (newPassword !== confirmPassword) {
      showSnackbar('Confirm password must be same as New Password.');
    } else {
      setLoading(true);
      changePassword({ id: profile?.id ?? 0, userType: profile?.userType ?? 'Student', oldPassword: oldPassword, newPassword: newPassword })
        .then((response: BaseResponse) => {
          setLoading(false);
          showSnackbar(response.message);
          if (response.isSuccess) {
            navigation.goBack();
          }
        })
        .catch((error: any) => {
          setLoading(false);
          showSnackbar(responseError(error).error.message);
        });
    }
  };

  return { isLoading, onChangePassword };
};
