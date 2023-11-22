import { call, put } from 'redux-saga/effects';
import { AnnouncementResponse, getAnnouncements } from '../../data';
import { responseError } from '../../utils';
import { AnnouncementsRequest, announcementsSuccess, announcementsFailed } from '../actions';

export function* announcementsSaga({ onSuccess, onError, id, role }: AnnouncementsRequest) {
  try {
    const response: AnnouncementResponse = yield call(getAnnouncements, { id: id, role: role });
    if (response && response.events && response.events.length > 0) {
      yield put(announcementsSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(announcementsFailed(responseError('Announcements not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(announcementsFailed(responseError(error)));
    onError && onError();
  }
}
