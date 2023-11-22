import { call, put } from 'redux-saga/effects';
import { EventResponse, getEvents } from '../../data';
import { responseError } from '../../utils';
import { eventsFailed, EventsRequest, eventsSuccess } from '../actions';

export function* eventsSaga({ onSuccess, onError }: EventsRequest) {
  try {
    const response: EventResponse = yield call(getEvents);
    if (response && response.length > 0) {
      yield put(eventsSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(eventsFailed(responseError('Events not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(eventsFailed(responseError(error)));
    onError && onError();
  }
}
