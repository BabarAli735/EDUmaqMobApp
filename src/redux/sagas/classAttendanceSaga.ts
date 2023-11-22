import { call, put } from 'redux-saga/effects';
import { getSyllabus, SyllabusResponse } from '../../data';
import { responseError } from '../../utils';
import { syllabusFailed, SyllabusRequest, syllabusSuccess } from '../actions';
import { ExamClassesRequest, ExamEntriesRequest, ExamMarksPostRequest, ExamSubjectRequest, examCategoryFailed, examCategorySuccess, examClassesFailed, examClassesSuccess, examEntriesFailed, examEntriesSuccess, examPlannerFailed, examPlannerSuccess, examSubjectFailed, examSubjectSuccess, marksPostFailed, marksPostSuccess } from '../actions/MarksEntryActions';
import { getExamCategories, getExamClasses, getExamMarks, getExamPlanners, getExamSubjects, postExamMarks } from '../../data/services/MarksEntryServices';
import { Alert } from 'react-native';
import { getClassAttendance, submitClassAttendance } from '../../data/services/ClassAttendance';
import { ClassAttendancePostReq, ClassAttendnaceGetReq, classAttendancePostFailed, classAttendancePostSuccess, getClassAttendanceFailed, getClassAttendanceSuccess } from '../actions/ClassAttendanceActions';
import { ClassAttendnaceParams } from '../../data/model/ClassAttendance';

export function* classAttendanceGetSaga({ batchId,classId, onSuccess, onError }:ClassAttendnaceGetReq) {
  try {
    const response: [] = yield call(getClassAttendance,{batchId:batchId,classId:classId});
    if (response && response.length > 0) {
      yield put(getClassAttendanceSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(getClassAttendanceFailed(responseError('Categories not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(getClassAttendanceFailed(responseError(error)));
    onError && onError();
  }
}


export function* classAttendancePostSaga({ params, onSuccess, onError }: ClassAttendancePostReq) {
  try {
    const response: {} = yield call(submitClassAttendance, params);
    if (response) {
      yield put(classAttendancePostSuccess(response));
      Alert.alert('Success',"Class Attendance Submitted SuccessFully")
      onSuccess && onSuccess();
    } else {
      yield put(classAttendancePostFailed(responseError('Class Attendance Submit application failed.')));
      onError && onError();
    }
  } catch (error: any) {
    console.log('classAttendancePostSaga error====',error);
    yield put(classAttendancePostFailed(responseError(error)));
    onError && onError();
  }
}
