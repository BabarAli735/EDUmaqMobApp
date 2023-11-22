import { call, put } from 'redux-saga/effects';
import { AttendanceResponse, getAttendance } from '../../data';
import { responseError } from '../../utils';
import { attendanceFailed, AttendanceRequest, attendanceSuccess } from '../actions';

export function* attendanceSaga({ id, date, onSuccess, onError }: AttendanceRequest) {
  try {
    const response: AttendanceResponse = yield call(getAttendance, { id: id, date: date });
    if (response) {
      yield put(attendanceSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(attendanceFailed(responseError('Attendance not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(attendanceFailed(responseError(error)));
    onError && onError();
  }
}
