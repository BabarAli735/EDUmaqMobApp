import { call, put } from 'redux-saga/effects';
import { ClassAssignmentResponse, getClassAssignment } from '../../data';
import { responseError } from '../../utils';
import { getClassAssignmentFailed, ClassAssignmentGetReq, getClassAssignmentSuccess } from '../actions';

export function* classAssignmentSaga({ onSuccess, onError }: ClassAssignmentGetReq) {
  try {
    const response: ClassAssignmentResponse = yield call(getClassAssignment);
    if (response && response.length > 0) {
      yield put(getClassAssignmentSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(getClassAssignmentFailed(responseError('Assignment not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(getClassAssignmentFailed(responseError(error)));
    onError && onError();
  }
}
