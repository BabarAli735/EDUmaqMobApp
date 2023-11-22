import React from 'react';
import { useSelector } from 'react-redux';
import { sendOTPRequest, sendOTPSuccess, useUiSelector, verifyOTPRequest, verifyOTPSuccess } from '../';
import { isValidMobile, isValidOTP } from '../../utils';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const mobileStateSelector = (state: RootState) => state.mobile;

export const useMobileSelector = () => {
  const { showSnackbar } = useUiSelector();
  const { isLoading, isOTPSend, isOTPVerified, error } = useSelector(mobileStateSelector);

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  React.useEffect(() => {
    StoreService.dispatch(sendOTPSuccess(false));
    StoreService.dispatch(verifyOTPSuccess(false));
  }, []);

  const sendMobileOTP = (mobile?: string) => {
    if (mobile && isValidMobile(mobile)) {
      StoreService.dispatch(sendOTPRequest({ mobile: mobile }));
    } else {
      showSnackbar('Please enter valid mobile number.');
    }
  };

  const verifyMobileOTP = (otp?: string) => {
    if (otp && isValidOTP(otp)) {
      StoreService.dispatch(verifyOTPRequest({ code: otp }));
    } else {
      showSnackbar('Please enter valid OTP.');
    }
  };

  return { isLoading, isOTPSend, isOTPVerified, sendMobileOTP, verifyMobileOTP };
};
