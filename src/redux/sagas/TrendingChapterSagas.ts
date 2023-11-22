import { call, put } from 'redux-saga/effects';
import { TrendingChapterResponse, getTrendingChapter } from '../../data';
import { responseError } from '../../utils';
import { TrendingChapterRequest, trendingChapterFailed, trendingChapterSuccess } from '../actions';

export function* trendingChapterSaga({ classId, batchId, onSuccess, onError }: TrendingChapterRequest) {
  try {
    const response: TrendingChapterResponse = yield call(getTrendingChapter, { classId, batchId });
    if (response) {
      yield put(trendingChapterSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(trendingChapterFailed(responseError('Trending Chapter not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(trendingChapterFailed(responseError(error)));
    onError && onError();
  }
}
