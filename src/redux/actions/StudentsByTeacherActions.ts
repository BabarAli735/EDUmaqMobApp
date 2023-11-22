import { ResponseError } from '../../utils';
import { COMPLAINT_LIST_FAILURE, COMPLAINT_LIST_REQ, COMPLAINT_LIST_SUCCESS, STUDENT_LIST_FAILURE, STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, SUB_STUDENT_COMPLAINT_FAILURE, SUB_STUDENT_COMPLAINT_REQ, SUB_STUDENT_COMPLAINT_SUCCESS } from '../constants/StudentByTeacherConstant';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface MyStudentsRequest extends ReturnType<typeof mystudentsRequest> {}
export interface MyStudentsSuccess extends ReturnType<typeof mystudentsSuccess> {}
export interface MyStudentsFailure extends ReturnType<typeof mystudentsFailed> {}

export interface SubmitComplaintStudentsRequest extends ReturnType<typeof studentComplaintSubmitReq> {}
export interface SubmitComplaintStudentsSuccess extends ReturnType<typeof studentComplaintSubmitSuccess> {}
export interface SubmitComplaintStudentsFailure extends ReturnType<typeof studentComplaintSubmitFailed> {}

export interface ComplaintListRequest extends ReturnType<typeof complaintListReq> {}
export interface ComplaintListSuccess extends ReturnType<typeof complaintListSuccess> {}
export interface ComplaintListFailure extends ReturnType<typeof complaintListFailed> {}

export type MyStudentActions = MyStudentsRequest | MyStudentsSuccess | MyStudentsFailure;
export type ComplaintListActions = ComplaintListRequest | ComplaintListSuccess | ComplaintListFailure;
export type SubmitComplaintStudentActions = SubmitComplaintStudentsRequest | SubmitComplaintStudentsSuccess | SubmitComplaintStudentsFailure;

export const mystudentsRequest = (params: { teacherid?: number } & WithCallbacks) =>
  <const>{
    type: STUDENT_LIST_REQUEST,
    ...params,
  };

export const mystudentsSuccess = (mystudents: []) =>
  <const>{
    type: STUDENT_LIST_SUCCESS,
    mystudents: mystudents,
  };

export const mystudentsFailed = (error: ResponseError) =>
  <const>{
    type: STUDENT_LIST_FAILURE,
    error: error,
  };

  export const complaintListReq = (params: { teacherid?: number } & WithCallbacks) =>
  <const>{
    type: COMPLAINT_LIST_REQ,
    ...params,
  };

export const complaintListSuccess = (complaints: []) =>
  <const>{
    type: COMPLAINT_LIST_SUCCESS,
    complaints: complaints,
  };

export const complaintListFailed = (err: ResponseError) =>
  <const>{
    type: COMPLAINT_LIST_FAILURE,
    err: err,
  };

  export const studentComplaintSubmitReq = (params:{  admissionId:number,subject:string,complaintDetail:string,status:boolean,isDeleted:boolean } & WithCallbacks) =>
  <const>{
    type: SUB_STUDENT_COMPLAINT_REQ,
    ...params,
  };

export const studentComplaintSubmitSuccess = (responseData: []) =>
  <const>{
    type: SUB_STUDENT_COMPLAINT_SUCCESS,
    responseData: responseData,
  };

export const studentComplaintSubmitFailed = (error: ResponseError) =>
  <const>{
    type: SUB_STUDENT_COMPLAINT_FAILURE,
    error: error,
  };