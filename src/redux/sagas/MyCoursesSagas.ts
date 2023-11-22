import { call, put } from 'redux-saga/effects';
import { MyCoursesResponse, getMyCourses } from '../../data';
import { responseError } from '../../utils';
import { MyCoursesRequest, myCoursesFailed, myCoursesSuccess } from '../actions';

export function* myCoursesSaga({ classId, batchId, onSuccess, onError }: MyCoursesRequest) {
  try {
    const response: MyCoursesResponse = yield call(getMyCourses, { classId, batchId });
    if (response) {
      yield put(myCoursesSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(myCoursesFailed(responseError('My Courses not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(myCoursesFailed(responseError(error)));
    onError && onError();
  }
}
