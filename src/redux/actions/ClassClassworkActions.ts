import { ClassClassworkDetail } from '../../data/model/ClassClasswork';
import { ResponseError } from '../../utils';
import { CLASS_CLASSWORK_GET_FAILURE, CLASS_CLASSWORK_GET_REQ, CLASS_CLASSWORK_GET_SUCCESS } from '../constants/ClassClassworkConstants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface ClassClassworkGetReq extends ReturnType<typeof getClassClassworkReq> {}
export interface ClassClassworkGetSuccess extends ReturnType<typeof getClassClassworkSuccess> {}
export interface ClassClassworkGetFailure extends ReturnType<typeof getClassClassworkFailed> {}

export type ClassClassworkAction = ClassClassworkGetReq | ClassClassworkGetSuccess | ClassClassworkGetFailure;

export const getClassClassworkReq = (params: {} & WithCallbacks) =>
  <const>{
    type: CLASS_CLASSWORK_GET_REQ,
    ...params,
  };

export const getClassClassworkSuccess = (classClasswork: ClassClassworkDetail[]) =>
  <const>{
    type: CLASS_CLASSWORK_GET_SUCCESS,
    classClasswork: classClasswork,
  };

export const getClassClassworkFailed = (error: ResponseError) =>
  <const>{
    type: CLASS_CLASSWORK_GET_FAILURE,
    error: error,
  };
