import { call, put } from 'redux-saga/effects';
import { clear, getSiblings, getStudentProfile,getTeacherProfile, login, LoginResponse, replaceSiblings, setToken, setUserProfile, SiblingResponse, TeacherProfile } from '../../data';
import { responseError } from '../../utils';
import { loginFailed, LoginMobileRequest, LoginRequest, loginSuccess, ProfileRequest, siblingFailed, SiblingRequest, siblingSuccess, switchSiblingFailed, SwitchSiblingRequest, switchSiblingSuccess, TeacherProfileRequest } from '../actions';
import { loginMobile, Profile } from './../../data';

export function* loginMobileSaga({ mobile, onSuccess, onError }: LoginMobileRequest) {
  try {
    const response: LoginResponse = yield call(loginMobile, { mobile: mobile });

    if (response.isLoginedSuccess && response.user) {
      yield call(setToken, response.token ? response.token : '');
      yield call(setUserProfile, response.user);
      yield put(loginSuccess(response.user));
      onSuccess && onSuccess();
    } else {
      yield put(loginFailed(responseError('Invalid credentials. Please try again.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(loginFailed(responseError(error)));
    onError && onError();
  }
}

export function* loginSaga({ email, password, onSuccess, onError }: LoginRequest) {
  try {
    const response: LoginResponse = yield call(login, {
      email: email,
      password: password,
    });

    if (response.isLoginedSuccess && response.user) {

      
      yield call(setToken, response.token ? response.token : '');
      yield call(setUserProfile, response.user);
      yield put(loginSuccess(response.user));
      onSuccess && onSuccess();
    } else {
      yield put(loginFailed(responseError('Invalid credentials. Please try again.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(loginFailed(responseError(error)));
    onError && onError();
  }
}

export function* profileSaga({ id, onSuccess, onError }: ProfileRequest) {
  try {
    const response: Profile = yield call(getStudentProfile, { id: id });
    if (response) {
      yield call(setUserProfile, response);
      yield put(loginSuccess(response));
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
  } catch (error: any) {
    onError && onError();
  }
}

export function* teacherProfileSaga({ id, onSuccess, onError }: TeacherProfileRequest) {
  console.log('here****')
  try {
    const response: TeacherProfile = yield call(getTeacherProfile, { id: id });
    if (response) {
      yield call(setUserProfile, response);
      yield put(loginSuccess(response));
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
  } catch (error: any) {
    onError && onError();
  }
}

export function* logOutSaga() {
  yield call(clear);
  yield put(loginFailed(responseError('')));
}

export function* siblingsSaga({ id, onSuccess, onError }: SiblingRequest) {
  try {
    const response: SiblingResponse = yield call(getSiblings, { id: id });
    console.log(response)
    if (response && response.length > 0) {
      yield put(siblingSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(siblingFailed(responseError('Siblings not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(siblingFailed(responseError(error)));
    onError && onError();
  }
}

export function* switchSiblingProfile({ id, onSuccess, onError }: SwitchSiblingRequest) {
  try {
    const response: SiblingResponse = yield call(replaceSiblings, { id: id });
    console.log(response)
    if (response && response.length > 0) {
      // yield call(setUserProfile, response);
      yield put(switchSiblingSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(switchSiblingFailed(responseError('Siblings not available.')));
      onError && onError();
    }
  } catch (error: any) {
    console.log(error)
    yield put(switchSiblingFailed(responseError(error)));
    onError && onError();
  }
}
