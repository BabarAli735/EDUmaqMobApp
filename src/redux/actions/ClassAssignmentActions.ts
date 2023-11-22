import { ClassAssignmentDetail } from '../../data/model/ClassAssignment';
import { ResponseError } from '../../utils';
import { CLASS_ASSIGNMENT_GET_FAILURE, CLASS_ASSIGNMENT_GET_REQ, CLASS_ASSIGNMENT_GET_SUCCESS } from '../constants/ClassAssignmentConstants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface ClassAssignmentGetReq extends ReturnType<typeof getClassAssignmentReq> {}
export interface ClassAssignmentGetSuccess extends ReturnType<typeof getClassAssignmentSuccess> {}
export interface ClassAssignmentGetFailure extends ReturnType<typeof getClassAssignmentFailed> {}

export type ClassAssignmentAction = ClassAssignmentGetReq | ClassAssignmentGetSuccess | ClassAssignmentGetFailure;

export const getClassAssignmentReq = (params: {} & WithCallbacks) =>
  <const>{
    type: CLASS_ASSIGNMENT_GET_REQ,
    ...params,
  };

export const getClassAssignmentSuccess = (classAssignment: ClassAssignmentDetail[]) =>
  <const>{
    type: CLASS_ASSIGNMENT_GET_SUCCESS,
    classAssignment: classAssignment,
  };

export const getClassAssignmentFailed = (error: ResponseError) =>
  <const>{
    type: CLASS_ASSIGNMENT_GET_FAILURE,
    error: error,
  };
