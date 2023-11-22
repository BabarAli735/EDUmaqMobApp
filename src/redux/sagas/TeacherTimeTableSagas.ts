import { call, put } from 'redux-saga/effects';
import { TeacherTimeTableResponse } from '../../data/model/TeacherTimeTable';
import { getTeacherTimeTable } from '../../data/services/teacher/TimeTableService';
import { responseError } from '../../utils';
import { teacherTimeTableFailed, TeacherTimeTableRequest, teacherTimeTableSuccess } from '../actions/TeacherTimeTableActions';

export function* teacherTimeTablesSaga({ id, day, onSuccess, onError }: TeacherTimeTableRequest) {
  try {
    const response: TeacherTimeTableResponse = yield call(getTeacherTimeTable, { id: id, day: day });
    if (response ) {
      yield put(teacherTimeTableSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(teacherTimeTableFailed(responseError('Time table not available for ' + day + ' .')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(teacherTimeTableFailed(responseError(error)));
    onError && onError();
  }
}
