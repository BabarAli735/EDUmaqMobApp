import { LearnWithVideoResponse } from '../../data';
import { ResponseError } from '../../utils';
import { WithCallbacks } from '../RootTypes';
import { LEARN_WITH_VIDEO_FAILURE, LEARN_WITH_VIDEO_REQUEST, LEARN_WITH_VIDEO_SUCCESS } from '../constants';

/* ------------- Types ------------- */
export interface LearnWithVideoRequest extends ReturnType<typeof learnWithVideoRequest> {}
export interface LearnWithVideoSuccess extends ReturnType<typeof learnWithVideoSuccess> {}
export interface LearnWithVideoFailure extends ReturnType<typeof learnWithVideoFailed> {}

export type LearnWithVideoAction = LearnWithVideoRequest | LearnWithVideoSuccess | LearnWithVideoFailure;

export const learnWithVideoRequest = (params: { classId?: number } & WithCallbacks) =>
  <const>{
    type: LEARN_WITH_VIDEO_REQUEST,
    ...params,
  };

export const learnWithVideoSuccess = (learnWithVideo: LearnWithVideoResponse) =>
  <const>{
    type: LEARN_WITH_VIDEO_SUCCESS,
    learnWithVideo: learnWithVideo,
  };

export const learnWithVideoFailed = (error: ResponseError) =>
  <const>{
    type: LEARN_WITH_VIDEO_FAILURE,
    error: error,
  };
