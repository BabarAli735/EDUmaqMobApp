import { call, put } from 'redux-saga/effects';
import { RecommendedLessonsResponse, getRecommendedLessons } from '../../data';
import { responseError } from '../../utils';
import { MyCoursesRequest, recommendedLessonsFailed, recommendedLessonsSuccess } from '../actions';

export function* recommendedLessonsSaga({ classId, batchId, onSuccess, onError }: MyCoursesRequest) {
  try {
    const response: RecommendedLessonsResponse = yield call(getRecommendedLessons, { classId, batchId });
    if (response) {
      yield put(recommendedLessonsSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(recommendedLessonsFailed(responseError('Recommended Lessons not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(recommendedLessonsFailed(responseError(error)));
    onError && onError();
  }
}
