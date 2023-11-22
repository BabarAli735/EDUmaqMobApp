import { call, put } from 'redux-saga/effects';
import { getSchoolProfile, InstituteDetail, InstituteVerifyResponse, registerInstitute, setInstitute, verifyInstitute } from '../../data';
import { responseError } from '../../utils';
import { InstituteProfileRequest, registerFailed, registerSuccess, SaveRequest, verifyFailed, VerifyRequest, verifySuccess } from '../actions';
import { InstituteRegisterResponse } from './../../data/model/Institute';
import { RegisterRequest } from './../actions/InstituteActions';

export function* verifySaga({ code, onSuccess, onError }: VerifyRequest) {
  try {
    const response: InstituteVerifyResponse = yield call(verifyInstitute, { code: code });
    if (response && response.isVerified && response.detail) {
      yield call(setInstitute, response.detail);
      yield put(verifySuccess(response.detail));
      onSuccess && onSuccess();
    } else {
      yield put(verifyFailed(responseError('Institute verification failed.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(verifyFailed(responseError(error)));
    onError && onError();
  }
}

export function* registerSaga({ body, onSuccess, onError }: RegisterRequest) {
  try {
    const response: InstituteRegisterResponse = yield call(registerInstitute, body);
    if (response) {
      yield put(registerSuccess(true));
      onSuccess && onSuccess();
    } else {
      yield put(registerFailed(responseError('Institute registration failed.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(registerFailed(responseError(error)));
    onError && onError();
  }
}

export function* saveSaga({ institute }: SaveRequest) {
  yield call(setInstitute, institute);
}

export function* instituteSaga({ onSuccess, onError }: InstituteProfileRequest) {
  try {
    const response: InstituteDetail = yield call(getSchoolProfile);
    if (response) {
      yield call(setInstitute, response);
      yield put(verifySuccess(response));
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
  } catch (error: any) {
    onError && onError();
  }
}
