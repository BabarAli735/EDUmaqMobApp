import { ResponseError } from '../../utils';
import { WithCallbacks } from '../RootTypes';
import { TEACHER_TIME_TABLE_FAILURE, TEACHER_TIME_TABLE_REQUEST, TEACHER_TIME_TABLE_SUCCESS } from '../constants/TeacherTimeTableConstants';
import { TeacherTimeTable } from '../../data/model/TeacherTimeTable';

/* ------------- Types ------------- */
export interface TeacherTimeTableRequest extends ReturnType<typeof teacherTimeTableRequest> {}
export interface TeacherTimeTableSuccess extends ReturnType<typeof teacherTimeTableSuccess> {}
export interface TeacherTimeTableFailure extends ReturnType<typeof teacherTimeTableFailed> {}

export type TeacherTimeTableAction = TeacherTimeTableRequest | TeacherTimeTableSuccess | TeacherTimeTableFailure;

export const teacherTimeTableRequest = (params: { id: number; day: string } & WithCallbacks) =>
  <const>{
    type: TEACHER_TIME_TABLE_REQUEST,
    ...params,
  };

export const teacherTimeTableSuccess = (teacherTimeTable: TeacherTimeTable[]) =>
  <const>{
    type: TEACHER_TIME_TABLE_SUCCESS,
    teacherTimeTable: teacherTimeTable,
  };

export const teacherTimeTableFailed = (error: ResponseError) =>
  <const>{
    type: TEACHER_TIME_TABLE_FAILURE,
    error: error,
  };
