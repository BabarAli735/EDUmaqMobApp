import { call, put } from 'redux-saga/effects';
import { LearnWithVideoResponse, getLearnWithVideo } from '../../data';
import { responseError } from '../../utils';
import { LearnWithVideoRequest, learnWithVideoFailed, learnWithVideoSuccess } from '../actions';

export function* learnWithVideoSaga({ classId, onSuccess, onError }: LearnWithVideoRequest) {
  try {
    const response: LearnWithVideoResponse = yield call(getLearnWithVideo, { classId });
    if (response) {
      yield put(learnWithVideoSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(learnWithVideoFailed(responseError('Trending Chapter not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(learnWithVideoFailed(responseError(error)));
    onError && onError();
  }
}
