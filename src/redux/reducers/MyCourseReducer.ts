import { MyCoursesResponse } from '../../data';
import { ResponseError } from '../../utils';
import { MyCoursesAction, MyCoursesFailure, MyCoursesSuccess } from '../actions';
import { MY_COURSE_FAILURE, MY_COURSE_REQUEST, MY_COURSE_SUCCESS } from '../constants';

/* ------------- State ------------- */
type MyCoursesStateType = typeof initialState;
export interface MyCoursesState extends MyCoursesStateType {}

const initialState = {
  myCourses: undefined as MyCoursesResponse | undefined,
  isLoading: false,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const myCoursesRequest = (state: MyCoursesState): MyCoursesState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const myCoursesSuccess = (state: MyCoursesState, action: MyCoursesSuccess): MyCoursesState => ({
  ...state,
  myCourses: action.courses,
  isLoading: false,
  error: undefined,
});

const myCoursesFailure = (state: MyCoursesState, action: MyCoursesFailure): MyCoursesState => ({
  ...state,
  myCourses: undefined,
  isLoading: false,
  error: action.error,
});

export const MyCoursesReducer = (state: MyCoursesState | undefined = initialState, action: MyCoursesAction): MyCoursesState => {
  switch (action.type) {
    case MY_COURSE_REQUEST:
      return myCoursesRequest(state);
    case MY_COURSE_SUCCESS:
      return myCoursesSuccess(state, action);
    case MY_COURSE_FAILURE:
      return myCoursesFailure(state, action);
    default:
      return state;
  }
};
