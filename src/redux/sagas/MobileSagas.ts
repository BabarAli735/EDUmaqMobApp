import { call, put } from 'redux-saga/effects';
import { sendOTPFailed, SendOTPRequest, sendOTPSuccess, verifyOTPFailed, VerifyOTPRequest, verifyOTPSuccess } from '..';
import { sendOTP, SendOTPResponse, verifyOTP } from '../../data';
import { responseError } from '../../utils';

export function* sendOTPSaga({ mobile, onSuccess, onError }: SendOTPRequest) {
  try {
    const response: SendOTPResponse = yield call(sendOTP, { mobile: mobile });
    if (response && response.messageStatus === true) {
      yield put(sendOTPSuccess(true));
      onSuccess && onSuccess();
    } else {
      yield put(sendOTPFailed(responseError('Failed to send OTP.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(sendOTPFailed(responseError(error)));
    onError && onError();
  }
}

export function* verifyOTPSaga({ code, onSuccess, onError }: VerifyOTPRequest) {
  try {
    const response: SendOTPResponse = yield call(verifyOTP, { code: code });
    // if (response && response.messageStatus === true) {
      yield put(verifyOTPSuccess(true));
      onSuccess && onSuccess();
    // } else {
    //   yield put(verifyOTPFailed(responseError('Mobile OTP verification failed.')));
    //   onError && onError();
    // }
  } catch (error: any) {
    yield put(verifyOTPFailed(responseError(error)));
    onError && onError();
  }
}
