import {AttendanceTeacherResponse } from '../../data';
import { ResponseError } from '../../utils';
import { ATTENDANCE_TEACHER_FAILURE, ATTENDANCE_TEACHER_REQUEST, ATTENDANCE_TEACHER_SUCCESS } from '../constants/AttendanceTeacherConstants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface AttendanceTeacherRequest extends ReturnType<typeof attendanceTeacherRequest> {}
export interface AttendanceTeacherSuccess extends ReturnType<typeof attendanceTeacherSuccess> {}
export interface AttendanceTeacherFailure extends ReturnType<typeof attendanceTeacherFailed> {}

export type AttendanceTeacherAction = AttendanceTeacherSuccess | AttendanceTeacherRequest |  AttendanceTeacherFailure;

export const attendanceTeacherRequest = (params: { id?: number; date?: string } & WithCallbacks) =>
  <const>{
    type: ATTENDANCE_TEACHER_REQUEST,
    ...params,
  };

export const attendanceTeacherSuccess = (attendancesTeacher: AttendanceTeacherResponse) =>
  <const>{
    type: ATTENDANCE_TEACHER_SUCCESS,
    attendancesTeacher: attendancesTeacher,
  };

export const attendanceTeacherFailed = (error: ResponseError) =>
  <const>{
    type: ATTENDANCE_TEACHER_FAILURE,
    error: error,
  };



