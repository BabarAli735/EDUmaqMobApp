import { SyllabusAction, SyllabusFailure, SyllabusSuccess } from '..';
import { Syllabus } from '../../data';
import { ResponseError } from '../../utils';
import { ClassAttendancePostAction, ClassAttendancePostFailure, ClassAttendancePostSuccess, ClassAttendnaceGetAction, ClassAttendnaceGetFailure, ClassAttendnaceGetSuccess } from '../actions/ClassAttendanceActions';
import { ExamCategoryAction, ExamClassesAction, ExamClassesFailure, ExamClassesSuccess, ExamEntriesAction, ExamEntriesFailure, ExamEntriesReset, ExamEntriesSuccess, ExamMarksPostAction, ExamMarksPostFailure, ExamMarksPostSuccess, ExamPlannersAction, ExamPlannersFailure, ExamPlannersSuccess, ExamSubjectAction, ExamSubjectFailure, ExamSubjectRequest, ExamSubjectSuccess, ExamcategoryFailure, ExamcategorySuccess } from '../actions/MarksEntryActions';
import { SYLLABUS_FAILURE, SYLLABUS_REQUEST, SYLLABUS_SUCCESS } from '../constants';
import { CLASS_ATTENDANCE_GET_FAILURE, CLASS_ATTENDANCE_GET_REQ, CLASS_ATTENDANCE_GET_SUCCESS, CLASS_ATTENDANCE_POST_FAILURE, CLASS_ATTENDANCE_POST_REQ, CLASS_ATTENDANCE_POST_SUCCESS, EXM_CATEGORY_FAILURE, EXM_CATEGORY_REQUEST, EXM_CATEGORY_SUCCESS, EXM_CLASS_FAILURE, EXM_CLASS_REQUEST, EXM_CLASS_SUCCESS, EXM_ENTRIES_FAILURE, EXM_ENTRIES_REQUEST, EXM_ENTRIES_SUCCESS, EXM_EXAMINATION_FAILURE, EXM_EXAMINATION_REQUEST, EXM_EXAMINATION_SUCCESS, EXM_POST_ENTRIES_FAILURE, EXM_POST_ENTRIES_REQUEST, EXM_POST_ENTRIES_SUCCESS, EXM_SUBJECT_FAILURE, EXM_SUBJECT_REQUEST, EXM_SUBJECT_SUCCESS, REST_MARKS_LIST } from '../constants/MarksEntryConstants';

/* ------------- State ------------- */

type ClassAttendancePostType = typeof classAttendancePostState;
export interface ClassAttendancePostState extends ClassAttendancePostType {}

const classAttendancePostState = {
  isLoading: false,
  response: undefined as any | undefined,
  error: undefined as ResponseError | undefined,
};


type ClassAttendnaceGetStateType = typeof classAttendanceGetState;
export interface ClassAttendanceGetState extends ClassAttendnaceGetStateType {}

const classAttendanceGetState = {
  isLoading: false,
  attendances: undefined as [] | undefined,
  error: undefined as ResponseError | undefined,
};
/* ------------- Reducers ------------- */
const classAttendnaceGetRequest = (state: ClassAttendanceGetState): ClassAttendanceGetState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const classAttendnaceGetSuccess = (state: ClassAttendanceGetState, action: ClassAttendnaceGetSuccess): ClassAttendanceGetState => ({
  ...state,
  attendances: action.attendances,
  isLoading: false,
  error: undefined,
});

const classAttendnaceGetFailure = (state: ClassAttendanceGetState, action: ClassAttendnaceGetFailure): ClassAttendanceGetState => ({
  ...state,
  attendances: undefined,
  isLoading: false,
  error: action.error,
});





const classAttendnacePostRequest = (state: ClassAttendancePostState): ClassAttendancePostState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const classAttendnacePostSuccess = (state: ClassAttendancePostState, action: ClassAttendancePostSuccess): ClassAttendancePostState => ({
  ...state,
  response: action.response,
  isLoading: false,
  error: undefined,
});

const classAttendnacePostFailure = (state: ClassAttendancePostState, action: ClassAttendancePostFailure): ClassAttendancePostState => ({
  ...state,
  isLoading: false,
  error: action.error,
});

export const ClassAttendanceGetReducer = (state: ClassAttendanceGetState | undefined = classAttendanceGetState, action: ClassAttendnaceGetAction): ClassAttendanceGetState => {
  switch (action.type) {
    case CLASS_ATTENDANCE_GET_REQ:
      return classAttendnaceGetRequest(state);
    case CLASS_ATTENDANCE_GET_SUCCESS:
      return classAttendnaceGetSuccess(state, action);
    case CLASS_ATTENDANCE_GET_FAILURE:
      return classAttendnaceGetFailure(state, action);
    default:
      return state;
  }
};





export const classAttendancePostReducer = (state: ClassAttendancePostState | undefined = classAttendancePostState, action: ClassAttendancePostAction): ClassAttendancePostState => {
  switch (action.type) {
    case CLASS_ATTENDANCE_POST_REQ:
      return classAttendnacePostRequest(state);
    case CLASS_ATTENDANCE_POST_SUCCESS:
      return classAttendnacePostSuccess(state, action);
    case CLASS_ATTENDANCE_POST_FAILURE:
      return classAttendnacePostFailure(state, action);
    default:
      return state;
  }
};