import { NotificationAction, NotificationsFailure, NotificationsSuccess } from '..';
import { Notification } from '../../data';
import { ResponseError } from '../../utils';
import { NOTIFICATIONS_FAILURE, NOTIFICATIONS_REQUEST, NOTIFICATIONS_SUCCESS } from '../constants';

/* ------------- State ------------- */
type NotificationStateType = typeof initialState;
export interface NotificationState extends NotificationStateType {}

const initialState = {
  isLoading: false,
  notifications: undefined as Notification[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const notificationsRequest = (state: NotificationState): NotificationState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const notificationsSuccess = (state: NotificationState, action: NotificationsSuccess): NotificationState => ({
  ...state,
  notifications: action.notifications,
  isLoading: false,
  error: undefined,
});

const notificationsFailure = (state: NotificationState, action: NotificationsFailure): NotificationState => ({
  ...state,
  notifications: undefined,
  isLoading: false,
  error: action.error,
});

export const NotificationReducer = (state: NotificationState | undefined = initialState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case NOTIFICATIONS_REQUEST:
      return notificationsRequest(state);
    case NOTIFICATIONS_SUCCESS:
      return notificationsSuccess(state, action);
    case NOTIFICATIONS_FAILURE:
      return notificationsFailure(state, action);
    default:
      return state;
  }
};
