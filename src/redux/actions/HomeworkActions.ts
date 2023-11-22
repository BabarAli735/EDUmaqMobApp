import { HomeworkDetail } from '../../data';
import { ResponseError } from '../../utils';
import { HOMEWORKS_FAILURE, HOMEWORKS_REQUEST, HOMEWORKS_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface HomeworksRequest extends ReturnType<typeof homeworksRequest> {}
export interface HomeworksSuccess extends ReturnType<typeof homeworksSuccess> {}
export interface HomeworksFailure extends ReturnType<typeof homeworksFailed> {}

export type HomeworkAction = HomeworksRequest | HomeworksSuccess | HomeworksFailure;

export const homeworksRequest = (params: { id?: number } & WithCallbacks) =>
  <const>{
    type: HOMEWORKS_REQUEST,
    ...params,
  };

export const homeworksSuccess = (homeworks: HomeworkDetail[]) =>
  <const>{
    type: HOMEWORKS_SUCCESS,
    homeworks: homeworks,
  };

export const homeworksFailed = (error: ResponseError) =>
  <const>{
    type: HOMEWORKS_FAILURE,
    error: error,
  };
