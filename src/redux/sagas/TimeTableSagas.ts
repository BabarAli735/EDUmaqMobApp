import { call, put } from 'redux-saga/effects';
import { getTimeTable, TimeTableResponse } from '../../data';
import { responseError } from '../../utils';
import { timeTableFailed, TimeTableRequest, timeTableSuccess } from '../actions';

export function* timeTablesSaga({ id, day, onSuccess, onError }: TimeTableRequest) {
  try {
    const response: TimeTableResponse = yield call(getTimeTable, { id: id, day: day });
    if (response && response.length > 0) {
      yield put(timeTableSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(timeTableFailed(responseError('Time table not available for ' + day + ' .')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(timeTableFailed(responseError(error)));
    onError && onError();
  }
}
