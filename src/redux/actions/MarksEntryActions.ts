import { Syllabus } from '../../data';
import { MarksEntryPostReqParam } from '../../data/model/MarksEntry';
import { ResponseError } from '../../utils';
import { SYLLABUS_FAILURE, SYLLABUS_REQUEST, SYLLABUS_SUCCESS } from '../constants';
import { EXM_CATEGORY_FAILURE, EXM_CATEGORY_REQUEST, EXM_CATEGORY_SUCCESS, EXM_CLASS_FAILURE, EXM_CLASS_REQUEST, EXM_CLASS_SUCCESS, EXM_ENTRIES_FAILURE, EXM_ENTRIES_REQUEST, EXM_ENTRIES_SUCCESS, EXM_EXAMINATION_FAILURE, EXM_EXAMINATION_REQUEST, EXM_EXAMINATION_SUCCESS, EXM_POST_ENTRIES_FAILURE, EXM_POST_ENTRIES_REQUEST, EXM_POST_ENTRIES_SUCCESS, EXM_SUBJECT_FAILURE, EXM_SUBJECT_REQUEST, EXM_SUBJECT_SUCCESS, REST_MARKS_LIST } from '../constants/MarksEntryConstants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface ExamMarksPostRequest extends ReturnType<typeof marksPostRequest> {}
export interface ExamMarksPostSuccess extends ReturnType<typeof marksPostSuccess> {}
export interface ExamMarksPostFailure extends ReturnType<typeof marksPostFailed> {}

export type ExamMarksPostAction = ExamMarksPostRequest | ExamMarksPostSuccess | ExamMarksPostFailure;


export interface ExamcategoryRequest extends ReturnType<typeof examCategoryRequest> {}
export interface ExamcategorySuccess extends ReturnType<typeof examCategorySuccess> {}
export interface ExamcategoryFailure extends ReturnType<typeof examCategoryFailed> {}

export type ExamCategoryAction = ExamcategoryRequest | ExamcategorySuccess | ExamcategoryFailure;

export interface ExamPlannersRequest extends ReturnType<typeof examPlannerRequest> {}
export interface ExamPlannersSuccess extends ReturnType<typeof examPlannerSuccess> {}
export interface ExamPlannersFailure extends ReturnType<typeof examPlannerFailed> {}

export type ExamPlannersAction = ExamPlannersRequest | ExamPlannersSuccess | ExamPlannersFailure;


export interface ExamClassesRequest extends ReturnType<typeof examClassesRequest> {}
export interface ExamClassesSuccess extends ReturnType<typeof examClassesSuccess> {}
export interface ExamClassesFailure extends ReturnType<typeof examClassesFailed> {}

export type ExamClassesAction = ExamClassesRequest | ExamClassesSuccess | ExamClassesFailure;



export interface ExamSubjectRequest extends ReturnType<typeof examSubjectRequest> {}
export interface ExamSubjectSuccess extends ReturnType<typeof examSubjectSuccess> {}
export interface ExamSubjectFailure extends ReturnType<typeof examSubjectFailed> {}

export type ExamSubjectAction = ExamSubjectRequest | ExamSubjectSuccess | ExamSubjectFailure;



export interface ExamEntriesRequest extends ReturnType<typeof examEntriesRequest> {}
export interface ExamEntriesSuccess extends ReturnType<typeof examEntriesSuccess> {}
export interface ExamEntriesFailure extends ReturnType<typeof examEntriesFailed> {}
export interface ExamEntriesReset extends ReturnType<typeof examEntriesReset> {}

export type ExamEntriesAction = ExamEntriesRequest | ExamEntriesSuccess | ExamEntriesFailure|ExamEntriesReset;


export const examCategoryRequest = (params: {} & WithCallbacks) =>
  <const>{
    type: EXM_CATEGORY_REQUEST,
    ...params,
  };

export const examCategorySuccess = (categories: []) =>
  <const>{
    type: EXM_CATEGORY_SUCCESS,
    categories: categories,
  };

export const examCategoryFailed = (error: ResponseError) =>
  <const>{
    type: EXM_CATEGORY_FAILURE,
    error: error,
  };


  export const examPlannerRequest = (params: {} & WithCallbacks) =>
  <const>{
    type: EXM_EXAMINATION_REQUEST,
    ...params,
  };

export const examPlannerSuccess = (planners: []) =>
  <const>{
    type: EXM_EXAMINATION_SUCCESS,
    planners: planners,
  };

export const examPlannerFailed = (error: ResponseError) =>
  <const>{
    type: EXM_EXAMINATION_FAILURE,
    error: error,
  };



  export const examClassesRequest = (params: {id:number} & WithCallbacks) =>
  <const>{
    type: EXM_CLASS_REQUEST,
    ...params,
  };

export const examClassesSuccess = (classes: []) =>
  <const>{
    type: EXM_CLASS_SUCCESS,
    classes: classes,
  };

export const examClassesFailed = (error: ResponseError) =>
  <const>{
    type: EXM_CLASS_FAILURE,
    error: error,
  };




  export const examSubjectRequest = (params: {} & WithCallbacks) =>
  <const>{
    type: EXM_SUBJECT_REQUEST,
    ...params,
  };

export const examSubjectSuccess = (subjects: []) =>
  <const>{
    type: EXM_SUBJECT_SUCCESS,
    subjects: subjects,
  };

export const examSubjectFailed = (error: ResponseError) =>
  <const>{
    type: EXM_SUBJECT_FAILURE,
    error: error,
  };




  export const examEntriesRequest = (params:{categoryId:number,examId:number,classId:number,batchId:number,subjectId:number} & WithCallbacks) =>
  <const>{
    type: EXM_ENTRIES_REQUEST,
    ...params,
  };

  export const resetMarksEntries = (params:{} & WithCallbacks) =>
  <const>{
    type: REST_MARKS_LIST,
    ...params,
  };

export const examEntriesSuccess = (entries: []) =>
  <const>{
    type: EXM_ENTRIES_SUCCESS,
    entries: entries,
  };

export const examEntriesFailed = (error: ResponseError) =>
  <const>{
    type: EXM_ENTRIES_FAILURE,
    error: error,
  };

  export const examEntriesReset = () =>
  <const>{
    type: REST_MARKS_LIST,
    entries:[]
  };



export const marksPostRequest = (params: { marks: MarksEntryPostReqParam } & WithCallbacks) =>
<const>{
  type: EXM_POST_ENTRIES_REQUEST,
  ...params,
};

export const marksPostSuccess = (response: any) =>
<const>{
  type: EXM_POST_ENTRIES_SUCCESS,
  response: response,
};

export const marksPostFailed = (error: ResponseError) =>
<const>{
  type: EXM_POST_ENTRIES_FAILURE,
  error: error,
};