import { call, put } from 'redux-saga/effects';
import { TeacherLeaveApproval } from '../../data/model/TeacherLeaveApproval';
import { getLeaveApproval } from '../../data/services/teacher/LeaveApprovalService';
import { responseError } from '../../utils';
import {TeacherLeaveApprovalRequest,teacherLeaveApprovalSuccess,teacherLeaveApprovalFailed} from '../actions/TeacherLeaveApprovalActions';

export function* teacherLeaveApprovalSaga({ classId, batchId, onSuccess, onError }: TeacherLeaveApprovalRequest) {
  try {
    const response: TeacherLeaveApproval = yield call(getLeaveApproval, { classId: classId, batchId: batchId });
    if (response ) {
      yield put(teacherLeaveApprovalSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(teacherLeaveApprovalFailed(responseError('Not available for ' + batchId + ' .')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(teacherLeaveApprovalFailed(responseError(error)));
    onError && onError();
  }
}
