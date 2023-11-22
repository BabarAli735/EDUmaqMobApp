import { ResponseError } from '../../utils';
import { WithCallbacks } from '../RootTypes';
import { TEACHER_LEAVE_APPROVAL_FAILURE, TEACHER_LEAVE_APPROVAL_REQUEST, TEACHER_LEAVE_APPROVAL_SUCCESS } from '../constants/TeacherLeaveApprovalConstant';
import { TeacherLeaveApproval } from '../../data/model/TeacherLeaveApproval';

/* ------------- Types ------------- */
export interface TeacherLeaveApprovalRequest extends ReturnType<typeof teacherLeaveApprovalRequest> {}
export interface TeacherLeaveApprovalSuccess extends ReturnType<typeof teacherLeaveApprovalSuccess> {}
export interface TeacherLeaveApprovalFailure extends ReturnType<typeof teacherLeaveApprovalFailed> {}

export type TeacherLeaveApprovalAction = TeacherLeaveApprovalRequest | TeacherLeaveApprovalSuccess | TeacherLeaveApprovalFailure;

export const teacherLeaveApprovalRequest = (params: { classId: number; batchId: number } & WithCallbacks) =>
  <const>{
    type: TEACHER_LEAVE_APPROVAL_REQUEST,
    ...params,
  };

export const teacherLeaveApprovalSuccess = (teacherLeaveApproval: TeacherLeaveApproval) =>
  <const>{
    type: TEACHER_LEAVE_APPROVAL_SUCCESS,
    teacherLeaveApproval: teacherLeaveApproval,
  };

export const teacherLeaveApprovalFailed = (error: ResponseError) =>
  <const>{
    type: TEACHER_LEAVE_APPROVAL_FAILURE,
    error: error,
  };
