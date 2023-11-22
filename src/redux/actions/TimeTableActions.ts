import { ResponseError } from '../../utils';
import { WithCallbacks } from '../RootTypes';
import { TimeTable } from './../../data';
import { TIME_TABLE_FAILURE, TIME_TABLE_REQUEST, TIME_TABLE_SUCCESS } from './../constants';

/* ------------- Types ------------- */
export interface TimeTableRequest extends ReturnType<typeof timeTableRequest> {}
export interface TimeTableSuccess extends ReturnType<typeof timeTableSuccess> {}
export interface TimeTableFailure extends ReturnType<typeof timeTableFailed> {}

export type TimeTableAction = TimeTableRequest | TimeTableSuccess | TimeTableFailure;

export const timeTableRequest = (params: { id: number; day: string } & WithCallbacks) =>
  <const>{
    type: TIME_TABLE_REQUEST,
    ...params,
  };

export const timeTableSuccess = (timeTable: TimeTable[]) =>
  <const>{
    type: TIME_TABLE_SUCCESS,
    timeTable: timeTable,
  };

export const timeTableFailed = (error: ResponseError) =>
  <const>{
    type: TIME_TABLE_FAILURE,
    error: error,
  };
