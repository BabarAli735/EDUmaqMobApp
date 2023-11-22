import moment from 'moment';
import { call, put } from 'redux-saga/effects';
import { FeedbackDetail, FeedbackResponse, getFeedbacks, postFeedbackRequest } from '../../data';
import { responseError } from '../../utils';
import { feedbackFailed, FeedbackRequest, feedbacksFailed, FeedbacksRequest, feedbacksSuccess, feedbackSuccess } from '../actions';

export function* feedbacksSaga({ id, onSuccess, onError }: FeedbacksRequest) {
  try {
    const response: FeedbackResponse = yield call(getFeedbacks, { id: id });
    if (response && response.length > 0) {
      yield put(feedbacksSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(feedbacksFailed(responseError('Feedbacks not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(feedbacksFailed(responseError(error)));
    onError && onError();
  }
}

export function* feedbackSaga({ body, onSuccess, onError }: FeedbackRequest) {
  try {
    const response: FeedbackDetail = yield call(postFeedbackRequest, body);
    if (response) {
      response.createdDate = new Date();
      yield put(feedbackSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(feedbackFailed(responseError('Feedback not submitted.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(feedbackFailed(responseError(error)));
    onError && onError();
  }
}
