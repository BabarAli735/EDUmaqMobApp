import { Event } from '../../data';
import { ResponseError } from '../../utils';
import { EVENTS_FAILURE, EVENTS_REQUEST, EVENTS_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface EventsRequest extends ReturnType<typeof eventsRequest> {}
export interface EventsSuccess extends ReturnType<typeof eventsSuccess> {}
export interface EventsFailure extends ReturnType<typeof eventsFailed> {}

export type EventAction = EventsRequest | EventsSuccess | EventsFailure;

export const eventsRequest = (params: WithCallbacks) =>
  <const>{
    type: EVENTS_REQUEST,
    ...params,
  };

export const eventsSuccess = (events: Event[]) =>
  <const>{
    type: EVENTS_SUCCESS,
    events: events,
  };

export const eventsFailed = (error: ResponseError) =>
  <const>{
    type: EVENTS_FAILURE,
    error: error,
  };
