import { call, put } from 'redux-saga/effects';
import { getLeaveRequests, LeaveDetail, LeavesResponse, postLeaveRequest } from '../../data';
import { responseError } from '../../utils';
import { leaveFailed, LeaveRequest, leavesFailed, LeavesRequest, leavesSuccess, leaveSuccess } from '../actions';

export function* leavesSaga({ id, onSuccess, onError }: LeavesRequest) {
  try {
    const response: LeavesResponse = yield call(getLeaveRequests, { id: id });
    if (response && response.length > 0) {
      yield put(leavesSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(leavesFailed(responseError('You haven\'t applied for leave.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(leavesFailed(responseError(error)));
    onError && onError();
  }
}

export function* leaveSaga({ leave, onSuccess, onError }: LeaveRequest) {
  try {
    const response: LeaveDetail = yield call(postLeaveRequest, leave);
    if (response) {
      yield put(leaveSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(leaveFailed(responseError('Leave application failed.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(leaveFailed(responseError(error)));
    onError && onError();
  }
}
