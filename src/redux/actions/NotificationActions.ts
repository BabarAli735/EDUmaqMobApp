import { Notification } from '../../data';
import { ResponseError } from '../../utils';
import { NOTIFICATIONS_FAILURE, NOTIFICATIONS_REQUEST, NOTIFICATIONS_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface NotificationsRequest extends ReturnType<typeof notificationsRequest> {}
export interface NotificationsSuccess extends ReturnType<typeof notificationsSuccess> {}
export interface NotificationsFailure extends ReturnType<typeof notificationsFailed> {}

export type NotificationAction = NotificationsRequest | NotificationsSuccess | NotificationsFailure;

export const notificationsRequest = (params: WithCallbacks) =>
  <const>{
    type: NOTIFICATIONS_REQUEST,
    ...params,
  };

export const notificationsSuccess = (notifications: Notification[]) =>
  <const>{
    type: NOTIFICATIONS_SUCCESS,
    notifications: notifications,
  };

export const notificationsFailed = (error: ResponseError) =>
  <const>{
    type: NOTIFICATIONS_FAILURE,
    error: error,
  };
