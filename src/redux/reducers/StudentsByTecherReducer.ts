import { SyllabusAction, SyllabusFailure, SyllabusSuccess } from '..';
import { Syllabus } from '../../data';
import { ResponseError } from '../../utils';
import {  ComplaintListActions, ComplaintListFailure, ComplaintListSuccess, MyStudentActions, MyStudentsFailure, MyStudentsSuccess, SubmitComplaintStudentActions, SubmitComplaintStudentsFailure, SubmitComplaintStudentsSuccess } from '../actions/StudentsByTeacherActions';
import { SYLLABUS_FAILURE, SYLLABUS_REQUEST, SYLLABUS_SUCCESS } from '../constants';
import { COMPLAINT_LIST_FAILURE, COMPLAINT_LIST_REQ, COMPLAINT_LIST_SUCCESS, STUDENT_LIST_FAILURE, STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, SUB_STUDENT_COMPLAINT_FAILURE, SUB_STUDENT_COMPLAINT_REQ, SUB_STUDENT_COMPLAINT_SUCCESS } from '../constants/StudentByTeacherConstant';

/* ------------- State ------------- */
type MyStudentStateType = typeof initialState;
type SubmitComplaintStudentStateType = typeof initialState;
type ComplaintListStateType = typeof complaintState;

export interface MyStudentState extends MyStudentStateType {}
export interface SubmitComplaintStudentState extends SubmitComplaintStudentStateType {}
export interface ComplaintListState extends ComplaintListStateType {}

const initialState = {
  isLoading: false,
  myStudents: undefined as [] | undefined,
  responseData: undefined as [] | undefined,
  error: undefined as ResponseError | undefined,
 
};

const complaintState={
  loading: false,
  complaints: undefined as [] | undefined,
  err: undefined as ResponseError | undefined,
}




/* ------------- Reducers ------------- */
const myStudentsRequest = (state: MyStudentState): MyStudentState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const myStudentsSuccess = (state: MyStudentState, action: MyStudentsSuccess): MyStudentState => ({
  ...state,
  myStudents: action.mystudents,
  isLoading: false,
  error: undefined,
});

const myStudentsFailure = (state: MyStudentState, action: MyStudentsFailure): MyStudentState => ({
  ...state,
  myStudents: undefined,
  isLoading: false,
  error: action.error,
});

export const MyStudentsReducer = (state: MyStudentState | undefined = initialState, action: MyStudentActions): MyStudentState => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return myStudentsRequest(state);
    case STUDENT_LIST_SUCCESS:
      return myStudentsSuccess(state, action);
    case STUDENT_LIST_FAILURE:
      return myStudentsFailure(state, action);
    default:
      return state;
  }
};



/* ------------- Reducers ------------- */
const mycomplainListReq = (state: ComplaintListState): ComplaintListState => ({
  ...state,
  loading: true,
  err: undefined,
});

const mycomplainListSuccess = (state: ComplaintListState, action: ComplaintListSuccess): ComplaintListState => ({
  ...state,
  complaints: action.complaints,
  loading: false,
  err: undefined,
});

const mycomplainListFailure = (state: ComplaintListState, action: ComplaintListFailure): ComplaintListState => ({
  ...state,
  complaints: undefined,
  loading: false,
  err: action.err,
});

export const complaintListReducers = (state: ComplaintListState = complaintState, action: ComplaintListActions): ComplaintListState => {
  switch (action.type) {
    case COMPLAINT_LIST_REQ:
      return mycomplainListReq(state);
    case COMPLAINT_LIST_SUCCESS:
      return mycomplainListSuccess(state, action);
    case COMPLAINT_LIST_FAILURE:
      return mycomplainListFailure(state, action);
    default:
      return state;
  }
};






/* ------------- Reducers ------------- */
const submitStudentComplainReq = (state: SubmitComplaintStudentState): SubmitComplaintStudentState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const submitStudentComplainSuccess = (state: SubmitComplaintStudentState, action: SubmitComplaintStudentsSuccess): SubmitComplaintStudentState => ({
  ...state,
  responseData: action.responseData,
  isLoading: false,
  error: undefined,
});

const submitStudentComplainFailure = (state: SubmitComplaintStudentState, action: SubmitComplaintStudentsFailure): SubmitComplaintStudentState => ({
  ...state,
  responseData: undefined,
  isLoading: false,
  error: action.error,
});

export const submitStudentComplaintReducer = (state: SubmitComplaintStudentState  = initialState, action: SubmitComplaintStudentActions): SubmitComplaintStudentState => {
  switch (action.type) {
    case SUB_STUDENT_COMPLAINT_REQ:
      return submitStudentComplainReq(state);
    case SUB_STUDENT_COMPLAINT_SUCCESS:
      return submitStudentComplainSuccess(state, action);
    case SUB_STUDENT_COMPLAINT_FAILURE:
      return submitStudentComplainFailure(state, action);
    default:
      return state;
  }
};
