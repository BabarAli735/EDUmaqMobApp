import { call, put } from 'redux-saga/effects';
import {AttendanceTeacherResponse, } from '../../data';
import { getTeacherAttendance } from '../../data/services/AttendanceTeacherService';
import { responseError } from '../../utils';
import { attendanceTeacherFailed, AttendanceTeacherRequest, attendanceTeacherSuccess } from '../actions/AttendanceTeacherActions';

export function* attendanceTeacherSaga({ id, date, onSuccess, onError }: AttendanceTeacherRequest) {
  try {
    const response: AttendanceTeacherResponse = yield call(getTeacherAttendance, { id: id, date: date });
    if (response) {
      yield put(attendanceTeacherSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(attendanceTeacherFailed(responseError('Attendance not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(attendanceTeacherFailed(responseError(error)));
    onError && onError();
  }
}
