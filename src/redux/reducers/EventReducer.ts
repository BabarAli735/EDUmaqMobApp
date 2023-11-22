import { EventAction, EventsFailure, EventsSuccess } from '..';
import { Event } from '../../data';
import { ResponseError } from '../../utils';
import { EVENTS_FAILURE, EVENTS_REQUEST, EVENTS_SUCCESS } from '../constants';

/* ------------- State ------------- */
type EventStateType = typeof initialState;
export interface EventState extends EventStateType {}

const initialState = {
  isLoading: false,
  events: undefined as Event[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const eventsRequest = (state: EventState): EventState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const eventsSuccess = (state: EventState, action: EventsSuccess): EventState => ({
  ...state,
  events: action.events,
  isLoading: false,
  error: undefined,
});

const eventsFailure = (state: EventState, action: EventsFailure): EventState => ({
  ...state,
  events: undefined,
  isLoading: false,
  error: action.error,
});

export const EventReducer = (state: EventState | undefined = initialState, action: EventAction): EventState => {
  switch (action.type) {
    case EVENTS_REQUEST:
      return eventsRequest(state);
    case EVENTS_SUCCESS:
      return eventsSuccess(state, action);
    case EVENTS_FAILURE:
      return eventsFailure(state, action);
    default:
      return state;
  }
};
