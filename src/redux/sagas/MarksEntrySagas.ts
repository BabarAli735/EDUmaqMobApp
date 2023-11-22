import { call, put } from 'redux-saga/effects';
import { getSyllabus, SyllabusResponse } from '../../data';
import { responseError } from '../../utils';
import { syllabusFailed, SyllabusRequest, syllabusSuccess } from '../actions';
import { ExamClassesRequest, ExamEntriesRequest, ExamMarksPostRequest, ExamSubjectRequest, examCategoryFailed, examCategorySuccess, examClassesFailed, examClassesSuccess, examEntriesFailed, examEntriesSuccess, examPlannerFailed, examPlannerSuccess, examSubjectFailed, examSubjectSuccess, marksPostFailed, marksPostSuccess } from '../actions/MarksEntryActions';
import { getExamCategories, getExamClasses, getExamMarks, getExamPlanners, getExamSubjects, postExamMarks } from '../../data/services/MarksEntryServices';
import { Alert } from 'react-native';

export function* marksEntryCategoriesSaga({ id, onSuccess, onError }: SyllabusRequest) {
  try {
    const response: [] = yield call(getExamCategories);
    if (response && response.length > 0) {
      yield put(examCategorySuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(examCategoryFailed(responseError('Categories not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(examCategoryFailed(responseError(error)));
    onError && onError();
  }
}

export function* marksEntryPlannersSaga({ id, onSuccess, onError }: SyllabusRequest) {
  try {
    const response: [] = yield call(getExamPlanners);
    if (response && response.length > 0) {
      yield put(examPlannerSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(examPlannerFailed(responseError('Exams not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(examPlannerFailed(responseError(error)));
    onError && onError();
  }
}



export function* marksEntryClassesSaga({ id, onSuccess, onError }: ExamClassesRequest) {
  try {
    console.log(id)
    const response: [] = yield call(getExamClasses,{id:id});
    console.log(response)
    if (response && response.length > 0) {
      yield put(examClassesSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(examClassesFailed(responseError('Classes not available.')));
      onError && onError();
    }
  } catch (error: any) {
    console.log(error.response)
    yield put(examClassesFailed(responseError(error)));
    onError && onError();
  }
}



export function* marksEntrySubjectsSaga({  onSuccess, onError }: ExamSubjectRequest) {
  try {
    const response: [] = yield call(getExamSubjects);
    if (response && response.length > 0) {
      yield put(examSubjectSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(examSubjectFailed(responseError('Subjects not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(examSubjectFailed(responseError(error)));
    onError && onError();
  }
}




export function* marksEntriesSaga({categoryId,examId,classId,batchId,subjectId,  onSuccess, onError }: ExamEntriesRequest) {
  try {
    const response: [] = yield call(getExamMarks,{categoryId,examId,classId,batchId,subjectId});
    if (response && response.length > 0) {
      yield put(examEntriesSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(examEntriesFailed(responseError('Marks not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(examEntriesFailed(responseError(error)));
    onError && onError();
  }
}



export function* marksPostSaga({ marks, onSuccess, onError }: ExamMarksPostRequest) {
  try {
    const response: {} = yield call(postExamMarks, marks);
    if (response) {
      yield put(marksPostSuccess(response));
      Alert.alert('Success',"Marks Submitted SuccessFully")
      onSuccess && onSuccess();
    } else {
      yield put(marksPostFailed(responseError('Marks Submit application failed.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(marksPostFailed(responseError(error)));
    onError && onError();
  }
}
