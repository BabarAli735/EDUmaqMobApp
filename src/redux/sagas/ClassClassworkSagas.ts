import { call, put } from 'redux-saga/effects';
import { ClassClassworkResponse, getClassClasswork } from '../../data';
import { responseError } from '../../utils';
import { getClassClassworkFailed, ClassClassworkGetReq, getClassClassworkSuccess } from '../actions';

export function* classClassworkSaga({ onSuccess, onError }: ClassClassworkGetReq) {
  try {
    const response: ClassClassworkResponse = yield call(getClassClasswork);
    if (response && response.length > 0) {
      yield put(getClassClassworkSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(getClassClassworkFailed(responseError('Classwork not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(getClassClassworkFailed(responseError(error)));
    onError && onError();
  }
}
