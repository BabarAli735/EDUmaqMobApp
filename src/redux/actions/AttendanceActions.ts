import { AttendanceResponse } from '../../data';
import { ResponseError } from '../../utils';
import { ATTENDANCE_FAILURE, ATTENDANCE_REQUEST, ATTENDANCE_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface AttendanceRequest extends ReturnType<typeof attendanceRequest> {}
export interface AttendanceSuccess extends ReturnType<typeof attendanceSuccess> {}
export interface AttendanceFailure extends ReturnType<typeof attendanceFailed> {}

export type AttendanceAction = AttendanceRequest | AttendanceSuccess | AttendanceFailure;

export const attendanceRequest = (params: { id?: number; date?: string } & WithCallbacks) =>
  <const>{
    type: ATTENDANCE_REQUEST,
    ...params,
  };

export const attendanceSuccess = (attendances: AttendanceResponse) =>
  <const>{
    type: ATTENDANCE_SUCCESS,
    attendances: attendances,
  };

export const attendanceFailed = (error: ResponseError) =>
  <const>{
    type: ATTENDANCE_FAILURE,
    error: error,
  };
