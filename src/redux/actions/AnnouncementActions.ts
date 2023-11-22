import { AnnouncementResponse } from '../../data';
import { ResponseError } from '../../utils';
import { ANNOUNCEMENTS_FAILURE, ANNOUNCEMENTS_REQUEST, ANNOUNCEMENTS_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface AnnouncementsRequest extends ReturnType<typeof announcementsRequest> {}
export interface AnnouncementsSuccess extends ReturnType<typeof announcementsSuccess> {}
export interface AnnouncementsFailure extends ReturnType<typeof announcementsFailed> {}

export type AnnouncementAction = AnnouncementsRequest | AnnouncementsSuccess | AnnouncementsFailure;

export const announcementsRequest = (params: { id: number, role: string } & WithCallbacks) =>
  <const>{
    type: ANNOUNCEMENTS_REQUEST,
    ...params,
  };

export const announcementsSuccess = (announcements: AnnouncementResponse) =>
  <const>{
    type: ANNOUNCEMENTS_SUCCESS,
    announcement: announcements,
  };

export const announcementsFailed = (error: ResponseError) =>
  <const>{
    type: ANNOUNCEMENTS_FAILURE,
    error: error,
  };
