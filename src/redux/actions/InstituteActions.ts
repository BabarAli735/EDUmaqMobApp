import { InstituteDetail } from '../../data';
import { ResponseError } from '../../utils';
import { REGISTER_INSTITUTE_FAILURE, REGISTER_INSTITUTE_SUCCESS, SAVE_INSTITUTE, VERIFY_INSTITUTE_FAILURE, VERIFY_INSTITUTE_REQUEST, VERIFY_INSTITUTE_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';
import { InstituteRequest } from './../../data';
import { INSTITUTE_PROFILE_REQUEST, REGISTER_INSTITUTE_REQUEST } from './../constants/AuthConstants';

/* ------------- Types ------------- */
export interface VerifyRequest extends ReturnType<typeof verifyRequest> {}
export interface VerifySuccess extends ReturnType<typeof verifySuccess> {}
export interface VerifyFailure extends ReturnType<typeof verifyFailed> {}

export interface RegisterRequest extends ReturnType<typeof registerRequest> {}
export interface RegisterSuccess extends ReturnType<typeof registerSuccess> {}
export interface RegisterFailure extends ReturnType<typeof registerFailed> {}

export interface InstituteProfileRequest extends ReturnType<typeof instituteRequest> {}

export interface SaveRequest extends ReturnType<typeof saveRequest> {}

export type InstituteAction = VerifyRequest | VerifySuccess | VerifyFailure | RegisterRequest | RegisterSuccess | RegisterFailure | SaveRequest | InstituteProfileRequest;

export const verifyRequest = (params: { code: string } & WithCallbacks) =>
  <const>{
    type: VERIFY_INSTITUTE_REQUEST,
    ...params,
  };

export const verifySuccess = (institute: InstituteDetail) =>
  <const>{
    type: VERIFY_INSTITUTE_SUCCESS,
    institute: institute,
  };

export const verifyFailed = (error: ResponseError) =>
  <const>{
    type: VERIFY_INSTITUTE_FAILURE,
    error: error,
  };

export const registerRequest = (params: { body: InstituteRequest } & WithCallbacks) =>
  <const>{
    type: REGISTER_INSTITUTE_REQUEST,
    ...params,
  };

export const registerSuccess = (isRegistered: boolean) =>
  <const>{
    type: REGISTER_INSTITUTE_SUCCESS,
    isRegistered: isRegistered,
  };

export const registerFailed = (error: ResponseError) =>
  <const>{
    type: REGISTER_INSTITUTE_FAILURE,
    error: error,
  };

export const saveRequest = (institute: InstituteDetail) =>
  <const>{
    type: SAVE_INSTITUTE,
    institute: institute,
  };

export const instituteRequest = (params: WithCallbacks) =>
  <const>{
    type: INSTITUTE_PROFILE_REQUEST,
    ...params,
  };
