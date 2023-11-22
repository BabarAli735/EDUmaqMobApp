import { call, put } from 'redux-saga/effects';
import { getNotifications, NotificationResponse } from '../../data';
import { responseError } from '../../utils';
import { notificationsFailed, NotificationsRequest, notificationsSuccess } from '../actions';

export function* notificationsSaga({ onSuccess, onError }: NotificationsRequest) {
  try {
    const response: NotificationResponse = yield call(getNotifications);
    if (response) {
      yield put(notificationsSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(notificationsFailed(responseError('Notifications not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(notificationsFailed(responseError(error)));
    onError && onError();
  }
}
