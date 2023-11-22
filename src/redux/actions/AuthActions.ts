import { Profile, TeacherProfile } from '../../data';
import { ResponseError } from '../../utils';
import { LOGIN_FAILURE, LOGIN_MOBILE_REQUEST, PROFILE_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT, TEACHER_PROFILE_REQUEST } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface LoginMobileRequest extends ReturnType<typeof loginMobileRequest> {}
export interface ProfileRequest extends ReturnType<typeof profileRequest> {}
export interface TeacherProfileRequest extends ReturnType<typeof teacherProfileRequest> {}
export interface LoginRequest extends ReturnType<typeof loginRequest> {}
export interface LoginSuccess extends ReturnType<typeof loginSuccess> {}
export interface LoginFailure extends ReturnType<typeof loginFailed> {}
export interface LogOut extends ReturnType<typeof logout> {}

export type AuthAction = LoginMobileRequest | ProfileRequest | TeacherProfileRequest | LoginRequest | LoginSuccess | LoginFailure | LogOut;

/* ------------- Actions ------------- */
export const loginMobileRequest = (params: { mobile: string } & WithCallbacks) =>
  <const>{
    type: LOGIN_MOBILE_REQUEST,
    ...params,
  };

export const loginRequest = (params: { email: string; password: string } & WithCallbacks) =>
  <const>{
    type: LOGIN_REQUEST,
    ...params,
  };

export const loginSuccess = (profile: Profile|TeacherProfile) =>
  <const>{
    type: LOGIN_SUCCESS,
    profile: profile,
  };

export const loginFailed = (error: ResponseError) =>
  <const>{
    type: LOGIN_FAILURE,
    error: error,
  };

export const logout = () =>
  <const>{
    type: LOG_OUT,
  };

export const profileRequest = (params: { id: number } & WithCallbacks) =>
  <const>{
    type: PROFILE_REQUEST,
    ...params,
  };
  export const teacherProfileRequest = (params: { id: number } & WithCallbacks) =>
  <const>{
    type: TEACHER_PROFILE_REQUEST,
    ...params,
  };
