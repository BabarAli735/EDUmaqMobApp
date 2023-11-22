import { AnnouncementAction, AnnouncementsFailure, AnnouncementsSuccess } from '..';
import { ResponseError } from '../../utils';
import { ANNOUNCEMENTS_FAILURE, ANNOUNCEMENTS_REQUEST, ANNOUNCEMENTS_SUCCESS } from '../constants';
import { AnnouncementResponse } from './../../data';

/* ------------- State ------------- */
type AnnouncementStateType = typeof initialState;
export interface AnnouncementState extends AnnouncementStateType {}

const initialState = {
  isLoading: false,
  announcement: undefined as AnnouncementResponse | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const announcementsRequest = (state: AnnouncementState): AnnouncementState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const announcementsSuccess = (state: AnnouncementState, action: AnnouncementsSuccess): AnnouncementState => ({
  ...state,
  announcement: action.announcement,
  isLoading: false,
  error: undefined,
});

const announcementsFailure = (state: AnnouncementState, action: AnnouncementsFailure): AnnouncementState => ({
  ...state,
  announcement: undefined,
  isLoading: false,
  error: action.error,
});

export const AnnouncementReducer = (state: AnnouncementState | undefined = initialState, action: AnnouncementAction): AnnouncementState => {
  switch (action.type) {
    case ANNOUNCEMENTS_REQUEST:
      return announcementsRequest(state);
    case ANNOUNCEMENTS_SUCCESS:
      return announcementsSuccess(state, action);
    case ANNOUNCEMENTS_FAILURE:
      return announcementsFailure(state, action);
    default:
      return state;
  }
};
