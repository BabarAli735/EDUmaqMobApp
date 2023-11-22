import { call, put } from 'redux-saga/effects';
import { getHomeworks, HomeworkResponse } from '../../data';
import { responseError } from '../../utils';
import { homeworksFailed, HomeworksRequest, homeworksSuccess } from '../actions';

export function* homeworksSaga({ id, onSuccess, onError }: HomeworksRequest) {
  try {
    const response: HomeworkResponse = yield call(getHomeworks, { id: id });
    if (response) {
      yield put(homeworksSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(homeworksFailed(responseError('Homework not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(homeworksFailed(responseError(error)));
    onError && onError();
  }
}
