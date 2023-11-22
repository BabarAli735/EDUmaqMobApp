import { ResponseError } from '../../utils';
import { SEND_OTP_FAILURE, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, VERIFY_OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface SendOTPRequest extends ReturnType<typeof sendOTPRequest> {}
export interface SendOTPSuccess extends ReturnType<typeof sendOTPSuccess> {}
export interface SendOTPFailure extends ReturnType<typeof sendOTPFailed> {}

export interface VerifyOTPRequest extends ReturnType<typeof verifyOTPRequest> {}
export interface VerifyOTPSuccess extends ReturnType<typeof verifyOTPSuccess> {}
export interface VerifyOTPFailure extends ReturnType<typeof verifyOTPFailed> {}

export type MobileAction = SendOTPRequest | SendOTPSuccess | SendOTPFailure | VerifyOTPRequest | VerifyOTPSuccess | VerifyOTPFailure;

/* ------------- Actions ------------- */
export const sendOTPRequest = (params: { mobile: string } & WithCallbacks) =>
  <const>{
    type: SEND_OTP_REQUEST,
    ...params,
  };

export const sendOTPSuccess = (isOTPSend: boolean) =>
  <const>{
    type: SEND_OTP_SUCCESS,
    isOTPSend: isOTPSend,
  };

export const sendOTPFailed = (error: ResponseError) =>
  <const>{
    type: SEND_OTP_FAILURE,
    error: error,
  };

export const verifyOTPRequest = (params: { code: string } & WithCallbacks) =>
  <const>{
    type: VERIFY_OTP_REQUEST,
    ...params,
  };

export const verifyOTPSuccess = (isOTPVerified: boolean) =>
  <const>{
    type: VERIFY_OTP_SUCCESS,
    isOTPVerified: isOTPVerified,
  };

export const verifyOTPFailed = (error: ResponseError) =>
  <const>{
    type: VERIFY_OTP_FAILURE,
    error: error,
  };
