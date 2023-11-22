import { call, put } from 'redux-saga/effects';
import { ClassHomeworkResponse, getClassHomework } from '../../data';
import { responseError } from '../../utils';
import { getClassHomeworkFailed, ClassHomeworkGetReq, getClassHomeworkSuccess } from '../actions';

export function* classHomeworkSaga({ onSuccess, onError }: ClassHomeworkGetReq) {
  try {
    const response: ClassHomeworkResponse = yield call(getClassHomework);
    if (response && response.length > 0) {
      yield put(getClassHomeworkSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(getClassHomeworkFailed(responseError('Homework not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(getClassHomeworkFailed(responseError(error)));
    onError && onError();
  }
}
