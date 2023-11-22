import { call, put } from 'redux-saga/effects';
import { getInstitute, getToken, getUserProfile, InstituteDetail, isIntroduction, Profile } from '../../data';
import { AfterRehydrate, introduction, loginSuccess, verifySuccess } from '../actions';

export function* afterRehydrateSaga({}: AfterRehydrate) {
  const profile: Profile = yield call(getUserProfile);
  const institute: InstituteDetail = yield call(getInstitute);
  const intro: boolean = yield call(isIntroduction);

  yield put(introduction({ isIntroduction: intro }));

  if (profile) {
    const token: string = yield call(getToken);
    console.log('TOKEN: ' + token);
    yield put(loginSuccess(profile));
  }

  if (institute) {
    yield put(verifySuccess(institute));
  }
}
