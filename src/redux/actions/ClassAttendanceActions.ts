import { ClassAttendnaceParams } from '../../data/model/ClassAttendance';
import { ResponseError } from '../../utils';
import { CLASS_ATTENDANCE_GET_FAILURE, CLASS_ATTENDANCE_GET_REQ, CLASS_ATTENDANCE_GET_SUCCESS, CLASS_ATTENDANCE_POST_FAILURE, CLASS_ATTENDANCE_POST_REQ, CLASS_ATTENDANCE_POST_SUCCESS, EXM_CATEGORY_FAILURE, EXM_CATEGORY_REQUEST, EXM_CATEGORY_SUCCESS, EXM_CLASS_FAILURE, EXM_CLASS_REQUEST, EXM_CLASS_SUCCESS, EXM_ENTRIES_FAILURE, EXM_ENTRIES_REQUEST, EXM_ENTRIES_SUCCESS, EXM_EXAMINATION_FAILURE, EXM_EXAMINATION_REQUEST, EXM_EXAMINATION_SUCCESS, EXM_POST_ENTRIES_FAILURE, EXM_POST_ENTRIES_REQUEST, EXM_POST_ENTRIES_SUCCESS, EXM_SUBJECT_FAILURE, EXM_SUBJECT_REQUEST, EXM_SUBJECT_SUCCESS, REST_MARKS_LIST } from '../constants/MarksEntryConstants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface ClassAttendancePostReq extends ReturnType<typeof classAttendancePostRequest> {}
export interface ClassAttendancePostSuccess extends ReturnType<typeof classAttendancePostSuccess> {}
export interface ClassAttendancePostFailure extends ReturnType<typeof classAttendancePostFailed> {}

export type ClassAttendancePostAction = ClassAttendancePostReq | ClassAttendancePostSuccess | ClassAttendancePostFailure;


export interface ClassAttendnaceGetReq extends ReturnType<typeof getClassAttendanceReq> {}
export interface ClassAttendnaceGetSuccess extends ReturnType<typeof getClassAttendanceSuccess> {}
export interface ClassAttendnaceGetFailure extends ReturnType<typeof getClassAttendanceFailed> {}

export type ClassAttendnaceGetAction = ClassAttendnaceGetReq | ClassAttendnaceGetSuccess | ClassAttendnaceGetFailure;


export const getClassAttendanceReq = (params: {classId:number|string,batchId:number|string} & WithCallbacks) =>
  <const>{
    type: CLASS_ATTENDANCE_GET_REQ,
    ...params,
  };

export const getClassAttendanceSuccess = (attendances: []) =>
  <const>{
    type: CLASS_ATTENDANCE_GET_SUCCESS,
    attendances: attendances,
  };

export const getClassAttendanceFailed = (error: ResponseError) =>
  <const>{
    type: CLASS_ATTENDANCE_GET_FAILURE,
    error: error,
  };



export const classAttendancePostRequest = (params: { params: ClassAttendnaceParams } & WithCallbacks) =>
<const>{
  type: CLASS_ATTENDANCE_POST_REQ,
  ...params,
};

export const classAttendancePostSuccess = (response: any) =>
<const>{
  type: CLASS_ATTENDANCE_POST_SUCCESS,
  response: response,
};

export const classAttendancePostFailed = (error: ResponseError) =>
<const>{
  type: CLASS_ATTENDANCE_POST_FAILURE,
  error: error,
};