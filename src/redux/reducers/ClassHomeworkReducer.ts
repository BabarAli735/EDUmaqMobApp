import { ClassHomeworkGetReq, ClassHomeworkGetSuccess, ClassHomeworkGetFailure } from '..';
import { ClassHomeworkDetail } from '../../data';
import { ResponseError } from '../../utils';
import { CLASS_HOMEWORK_GET_REQ, CLASS_HOMEWORK_GET_SUCCESS, CLASS_HOMEWORK_GET_FAILURE } from '../constants';

/* ------------- State ------------- */
type ClassHomeworkStateType = typeof initialState;
export interface ClassHomeworkState extends ClassHomeworkStateType {}

const initialState = {
  isLoading: false,
  classHomework: undefined as ClassHomeworkDetail[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const classHomeworkRequest = (state: ClassHomeworkState): ClassHomeworkState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const classHomeworkSuccess = (state: ClassHomeworkState, action: ClassHomeworkGetSuccess): ClassHomeworkState => ({
  ...state,
  classHomework: action.classHomework,
  isLoading: false,
  error: undefined,
});

const classHomeworkFailure = (state: ClassHomeworkState, action: ClassHomeworkGetFailure): ClassHomeworkState => ({
  ...state,
  classHomework: undefined,
  isLoading: false,
  error: action.error,
});

export const ClassHomeworkReducer = (state: ClassHomeworkState | undefined = initialState, action: any): ClassHomeworkState => {
  switch (action.type) {
    case CLASS_HOMEWORK_GET_REQ:
      return classHomeworkRequest(state);
    case CLASS_HOMEWORK_GET_SUCCESS:
      return classHomeworkSuccess(state, action);
    case CLASS_HOMEWORK_GET_FAILURE:
      return classHomeworkFailure(state, action);
    default:
      return state;
  }
};
