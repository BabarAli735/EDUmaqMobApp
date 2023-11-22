import { LeaveDetail, LeaveRequestParams } from '../../data';
import { ResponseError } from '../../utils';
import { LEAVES_FAILURE, LEAVES_REQUEST, LEAVES_SUCCESS, LEAVE_FAILURE, LEAVE_REQUEST, LEAVE_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface LeavesRequest extends ReturnType<typeof leavesRequest> {}
export interface LeavesSuccess extends ReturnType<typeof leavesSuccess> {}
export interface LeavesFailure extends ReturnType<typeof leavesFailed> {}

export interface LeaveRequest extends ReturnType<typeof leaveRequest> {}
export interface LeaveSuccess extends ReturnType<typeof leaveSuccess> {}
export interface LeaveFailure extends ReturnType<typeof leaveFailed> {}

export type LeaveAction = LeavesRequest | LeavesSuccess | LeavesFailure | LeaveRequest | LeaveSuccess | LeaveFailure;

export const leavesRequest = (params: { id?: number } & WithCallbacks) =>
  <const>{
    type: LEAVES_REQUEST,
    ...params,
  };

export const leavesSuccess = (leaves: LeaveDetail[]) =>
  <const>{
    type: LEAVES_SUCCESS,
    leaves: leaves,
  };

export const leavesFailed = (error: ResponseError) =>
  <const>{
    type: LEAVES_FAILURE,
    error: error,
  };

export const leaveRequest = (params: { leave: LeaveRequestParams } & WithCallbacks) =>
  <const>{
    type: LEAVE_REQUEST,
    ...params,
  };

export const leaveSuccess = (leave: LeaveDetail) =>
  <const>{
    type: LEAVE_SUCCESS,
    leave: leave,
  };

export const leaveFailed = (error: ResponseError) =>
  <const>{
    type: LEAVE_FAILURE,
    error: error,
  };
