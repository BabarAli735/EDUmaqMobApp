import { ClassHomeworkDetail } from '../../data/model/ClassHomework';
import { ResponseError } from '../../utils';
import { CLASS_HOMEWORK_GET_REQ, CLASS_HOMEWORK_GET_SUCCESS, CLASS_HOMEWORK_GET_FAILURE } from '../constants/ClassHomeworkConstants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface ClassHomeworkGetReq extends ReturnType<typeof getClassHomeworkReq> {}
export interface ClassHomeworkGetSuccess extends ReturnType<typeof getClassHomeworkSuccess> {}
export interface ClassHomeworkGetFailure extends ReturnType<typeof getClassHomeworkFailed> {}

export type ClassHomeworkAction = ClassHomeworkGetReq | ClassHomeworkGetSuccess | ClassHomeworkGetFailure;

export const getClassHomeworkReq = (params: {} & WithCallbacks) =>
  <const>{
    type: CLASS_HOMEWORK_GET_REQ,
    ...params,
  };

export const getClassHomeworkSuccess = (classHomework: ClassHomeworkDetail[]) =>
  <const>{
    type: CLASS_HOMEWORK_GET_SUCCESS,
    classHomework: classHomework,
  };

export const getClassHomeworkFailed = (error: ResponseError) =>
  <const>{
    type: CLASS_HOMEWORK_GET_FAILURE,
    error: error,
  };
