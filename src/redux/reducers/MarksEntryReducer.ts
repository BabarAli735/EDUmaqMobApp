import { SyllabusAction, SyllabusFailure, SyllabusSuccess } from '..';
import { Syllabus } from '../../data';
import { ResponseError } from '../../utils';
import { ExamCategoryAction, ExamClassesAction, ExamClassesFailure, ExamClassesSuccess, ExamEntriesAction, ExamEntriesFailure, ExamEntriesReset, ExamEntriesSuccess, ExamMarksPostAction, ExamMarksPostFailure, ExamMarksPostSuccess, ExamPlannersAction, ExamPlannersFailure, ExamPlannersSuccess, ExamSubjectAction, ExamSubjectFailure, ExamSubjectRequest, ExamSubjectSuccess, ExamcategoryFailure, ExamcategorySuccess } from '../actions/MarksEntryActions';
import { SYLLABUS_FAILURE, SYLLABUS_REQUEST, SYLLABUS_SUCCESS } from '../constants';
import { EXM_CATEGORY_FAILURE, EXM_CATEGORY_REQUEST, EXM_CATEGORY_SUCCESS, EXM_CLASS_FAILURE, EXM_CLASS_REQUEST, EXM_CLASS_SUCCESS, EXM_ENTRIES_FAILURE, EXM_ENTRIES_REQUEST, EXM_ENTRIES_SUCCESS, EXM_EXAMINATION_FAILURE, EXM_EXAMINATION_REQUEST, EXM_EXAMINATION_SUCCESS, EXM_POST_ENTRIES_FAILURE, EXM_POST_ENTRIES_REQUEST, EXM_POST_ENTRIES_SUCCESS, EXM_SUBJECT_FAILURE, EXM_SUBJECT_REQUEST, EXM_SUBJECT_SUCCESS, REST_MARKS_LIST } from '../constants/MarksEntryConstants';

/* ------------- State ------------- */

type ExamMarksPostStateType = typeof marksMarksPostState;
export interface ExamMarksPostState extends ExamMarksPostStateType {}

const marksMarksPostState = {
  isLoading: false,
  response: undefined as any | undefined,
  error: undefined as ResponseError | undefined,
};


type ExamCategoryStateType = typeof marksCategoryState;
export interface ExamCategoryState extends ExamCategoryStateType {}

const marksCategoryState = {
  isLoading: false,
  categories: undefined as [] | undefined,
  error: undefined as ResponseError | undefined,
};

type ExamPlannersStateType = typeof marksPlannersState;
export interface ExamPlannersState extends ExamPlannersStateType {}

const marksPlannersState = {
  isLoading: false,
  planners: undefined as [] | undefined,
  error: undefined as ResponseError | undefined,
};


type ExamClassStateType = typeof marksClassState;
export interface ExamClassState extends ExamClassStateType {}

const marksClassState = {
  isLoading: false,
  classes: undefined as [] | undefined,
  error: undefined as ResponseError | undefined,
};



type ExamSubjectStateType = typeof marksSubjectState;
export interface ExamSubjectState extends ExamSubjectStateType {}

const marksSubjectState = {
  isLoading: false,
  subjects: undefined as [] | undefined,
  error: undefined as ResponseError | undefined,
};


type ExamEntriesStateType = typeof marksEntriesState;
export interface ExamEntriesState extends ExamEntriesStateType {}

const marksEntriesState = {
  isLoading: false,
  entries: undefined as [] | undefined,
  error: undefined as ResponseError | undefined,
};


/* ------------- Reducers ------------- */
const marksCategoriesRequest = (state: ExamCategoryState): ExamCategoryState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const marksCategorieSuccess = (state: ExamCategoryState, action: ExamcategorySuccess): ExamCategoryState => ({
  ...state,
  categories: action.categories,
  isLoading: false,
  error: undefined,
});

const marksCategorieFailure = (state: ExamCategoryState, action: ExamcategoryFailure): ExamCategoryState => ({
  ...state,
  categories: undefined,
  isLoading: false,
  error: action.error,
});



/* ------------- Reducers ------------- */
const marksPlannerRequest = (state: ExamPlannersState): ExamPlannersState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const marksPlannerSuccess = (state: ExamPlannersState, action: ExamPlannersSuccess): ExamPlannersState => ({
  ...state,
  planners: action.planners,
  isLoading: false,
  error: undefined,
});

const marksPlannerFailure = (state: ExamPlannersState, action: ExamPlannersFailure): ExamPlannersState => ({
  ...state,
  planners: undefined,
  isLoading: false,
  error: action.error,
});




/* ------------- Reducers ------------- */
const marksClassesRequest = (state: ExamClassState): ExamClassState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const marksClassesSuccess = (state: ExamClassState, action: ExamClassesSuccess): ExamClassState => ({
  ...state,
  classes: action.classes,
  isLoading: false,
  error: undefined,
});

const marksClassesFailure = (state: ExamClassState, action: ExamClassesFailure): ExamClassState => ({
  ...state,
  classes: undefined,
  isLoading: false,
  error: action.error,
});





/* ------------- Reducers ------------- */
const marksSubjectRequest = (state: ExamSubjectState): ExamSubjectState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const marksSubjectSuccess = (state: ExamSubjectState, action: ExamSubjectSuccess): ExamSubjectState => ({
  ...state,
  subjects: action.subjects,
  isLoading: false,
  error: undefined,
});

const marksSubjectFailure = (state: ExamSubjectState, action: ExamSubjectFailure): ExamSubjectState => ({
  ...state,
  subjects: undefined,
  isLoading: false,
  error: action.error,
});



/* ------------- Reducers ------------- */
const marksEntriesRequest = (state: ExamEntriesState): ExamEntriesState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const marksEntriesSuccess = (state: ExamEntriesState, action: ExamEntriesSuccess): ExamEntriesState => ({
  ...state,
  entries: action.entries,
  isLoading: false,
  error: undefined,
});

const marksEntriesFailure = (state: ExamEntriesState, action: ExamEntriesFailure): ExamEntriesState => ({
  ...state,
  entries: undefined,
  isLoading: false,
  error: action.error,
});

const marksEntriesReset = (state: ExamEntriesState, action: ExamEntriesReset): ExamEntriesState => ({
  ...state,
  entries: [],
  isLoading: false,
  error: undefined,
});


const markspostRequest = (state: ExamMarksPostState): ExamMarksPostState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const markspostSuccess = (state: ExamMarksPostState, action: ExamMarksPostSuccess): ExamMarksPostState => ({
  ...state,
  response: action.response,
  isLoading: false,
  error: undefined,
});

const markspostFailure = (state: ExamMarksPostState, action: ExamMarksPostFailure): ExamMarksPostState => ({
  ...state,
  isLoading: false,
  error: action.error,
});

export const MarksExamReducer = (state: ExamCategoryState | undefined = marksCategoryState, action: ExamCategoryAction): ExamCategoryState => {
  switch (action.type) {
    case EXM_CATEGORY_REQUEST:
      return marksCategoriesRequest(state);
    case EXM_CATEGORY_SUCCESS:
      return marksCategorieSuccess(state, action);
    case EXM_CATEGORY_FAILURE:
      return marksCategorieFailure(state, action);
    default:
      return state;
  }
};


export const ExamPlannersReducer = (state: ExamPlannersState | undefined = marksPlannersState, action: ExamPlannersAction): ExamPlannersState => {
  switch (action.type) {
    case EXM_EXAMINATION_REQUEST:
      return marksPlannerRequest(state);
    case EXM_EXAMINATION_SUCCESS:
      return marksPlannerSuccess(state, action);
    case EXM_EXAMINATION_FAILURE:
      return marksPlannerFailure(state, action);
    default:
      return state;
  }
};



export const ExamClassesReducer = (state: ExamClassState | undefined = marksClassState, action: ExamClassesAction): ExamClassState => {
  switch (action.type) {
    case EXM_CLASS_REQUEST:
      return marksClassesRequest(state);
    case EXM_CLASS_SUCCESS:
      return marksClassesSuccess(state, action);
    case EXM_CLASS_FAILURE:
      return marksClassesFailure(state, action);
    default:
      return state;
  }
};



export const ExamSubjectReducer = (state: ExamSubjectState | undefined = marksSubjectState, action: ExamSubjectAction): ExamSubjectState => {
  switch (action.type) {
    case EXM_SUBJECT_REQUEST:
      return marksSubjectRequest(state);
    case EXM_SUBJECT_SUCCESS:
      return marksSubjectSuccess(state, action);
    case EXM_SUBJECT_FAILURE:
      return marksSubjectFailure(state, action);
    default:
      return state;
  }
};



export const MarksEntriesReducer = (state: ExamEntriesState | undefined = marksEntriesState, action: ExamEntriesAction): ExamEntriesState => {
  switch (action.type) {
    case EXM_ENTRIES_REQUEST:
      return marksEntriesRequest(state);
    case EXM_ENTRIES_SUCCESS:
      return marksEntriesSuccess(state, action);
    case EXM_ENTRIES_FAILURE:
      return marksEntriesFailure(state, action);
      case REST_MARKS_LIST:
        return marksEntriesReset(state,action);
    default:
      return state;
  }
};



export const MarksPostReducer = (state: ExamMarksPostState | undefined = marksMarksPostState, action: ExamMarksPostAction): ExamMarksPostState => {
  switch (action.type) {
    case EXM_POST_ENTRIES_REQUEST:
      return markspostRequest(state);
    case EXM_POST_ENTRIES_SUCCESS:
      return markspostSuccess(state, action);
    case EXM_POST_ENTRIES_FAILURE:
      return markspostFailure(state, action);
    default:
      return state;
  }
};