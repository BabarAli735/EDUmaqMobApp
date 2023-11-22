import { call, put } from 'redux-saga/effects';
import { getSyllabus,  } from '../../data';
import { responseError } from '../../utils';
import { ComplaintListRequest, MyStudentsRequest, SubmitComplaintStudentsRequest, complaintListFailed, complaintListReq, complaintListSuccess, mystudentsFailed, mystudentsSuccess, studentComplaintSubmitFailed, studentComplaintSubmitSuccess } from '../actions/StudentsByTeacherActions';
import { PostStudentComplaint, getMyComplaints, getMyStudents } from '../../data/services/MyStudentsService';
import { Alert } from 'react-native';

export function* myStudentsSaga({ teacherid, onSuccess, onError }: MyStudentsRequest) {
  try {
    const response: [] = yield call(getMyStudents, { teacherid: teacherid });
    if (response && response.length > 0) {
      yield put(mystudentsSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(mystudentsFailed(responseError('Students not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(mystudentsFailed(responseError(error)));
    onError && onError();
  }
}



export function* myComplaintList({ teacherid, onSuccess, onError }: ComplaintListRequest) {
  try {
    const response: [] = yield call(getMyComplaints, { teacherid: teacherid });
   console.log(response)
    if (response && response.length > 0) {
      yield put(complaintListSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(complaintListFailed(responseError('Complaints not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(complaintListFailed(responseError(error)));
    onError && onError();
  }
}

export function* submitStudentComplaintSaga({ admissionId,subject,complaintDetail,status,isDeleted , onSuccess, onError }: SubmitComplaintStudentsRequest) {
  try {console.log( admissionId,subject,complaintDetail,status,isDeleted )
    const response: [] = yield call(PostStudentComplaint, { admissionId,subject,complaintDetail,status,isDeleted });
    if (response && Object.keys(response)?.length>0) {
      yield put(studentComplaintSubmitSuccess(response));
      Alert.alert('Success', 'Complaint SuccessFully Submitted')
      onSuccess && onSuccess();
    } else {
      yield put(studentComplaintSubmitFailed(responseError('Failed to complaint for this student.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(studentComplaintSubmitFailed(responseError(error)));
    onError && onError();
  }
}
