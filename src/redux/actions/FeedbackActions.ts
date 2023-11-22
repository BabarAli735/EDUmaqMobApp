import { FeedbackDetail, FeedbackRequestParams } from '../../data';
import { ResponseError } from '../../utils';
import { FEEDBACKS_FAILURE, FEEDBACKS_REQUEST, FEEDBACKS_SUCCESS, FEEDBACK_FAILURE, FEEDBACK_REQUEST, FEEDBACK_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface FeedbacksRequest extends ReturnType<typeof feedbacksRequest> {}
export interface FeedbacksSuccess extends ReturnType<typeof feedbacksSuccess> {}
export interface FeedbacksFailure extends ReturnType<typeof feedbacksFailed> {}
export interface FeedbackRequest extends ReturnType<typeof feedbackRequest> {}
export interface FeedbackSuccess extends ReturnType<typeof feedbackSuccess> {}
export interface FeedbackFailure extends ReturnType<typeof feedbackFailed> {}

export type FeedbackAction = FeedbacksRequest | FeedbacksSuccess | FeedbacksFailure | FeedbackRequest | FeedbackSuccess | FeedbackFailure;

export const feedbacksRequest = (params: { id?: number } & WithCallbacks) =>
  <const>{
    type: FEEDBACKS_REQUEST,
    ...params,
  };

export const feedbacksSuccess = (feedbacks: FeedbackDetail[]) =>
  <const>{
    type: FEEDBACKS_SUCCESS,
    feedbacks: feedbacks,
  };

export const feedbacksFailed = (error: ResponseError) =>
  <const>{
    type: FEEDBACKS_FAILURE,
    error: error,
  };

export const feedbackRequest = (params: { body: FeedbackRequestParams } & WithCallbacks) =>
  <const>{
    type: FEEDBACK_REQUEST,
    ...params,
  };

export const feedbackSuccess = (feedback: FeedbackDetail) =>
  <const>{
    type: FEEDBACK_SUCCESS,
    feedback: feedback,
  };

export const feedbackFailed = (error: ResponseError) =>
  <const>{
    type: FEEDBACK_FAILURE,
    error: error,
  };
