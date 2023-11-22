import { ClassAssignmentGetReq, ClassAssignmentGetSuccess, ClassAssignmentGetFailure } from '..';
import { ClassAssignmentDetail } from '../../data';
import { ResponseError } from '../../utils';
import { CLASS_ASSIGNMENT_GET_REQ, CLASS_ASSIGNMENT_GET_SUCCESS, CLASS_ASSIGNMENT_GET_FAILURE } from '../constants';

/* ------------- State ------------- */
type ClassAssignmentStateType = typeof initialState;
export interface ClassAssignmentState extends ClassAssignmentStateType {}

const initialState = {
  isLoading: false,
  classAssignment: undefined as ClassAssignmentDetail[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const classAssignmentRequest = (state: ClassAssignmentState): ClassAssignmentState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const classAssignmentSuccess = (state: ClassAssignmentState, action: ClassAssignmentGetSuccess): ClassAssignmentState => ({
  ...state,
  classAssignment: action.classAssignment,
  isLoading: false,
  error: undefined,
});

const classAssignmentFailure = (state: ClassAssignmentState, action: ClassAssignmentGetFailure): ClassAssignmentState => ({
  ...state,
  classAssignment: undefined,
  isLoading: false,
  error: action.error,
});

export const ClassAssignmentReducer = (state: ClassAssignmentState | undefined = initialState, action: any): ClassAssignmentState => {
  switch (action.type) {
    case CLASS_ASSIGNMENT_GET_REQ:
      return classAssignmentRequest(state);
    case CLASS_ASSIGNMENT_GET_SUCCESS:
      return classAssignmentSuccess(state, action);
    case CLASS_ASSIGNMENT_GET_FAILURE:
      return classAssignmentFailure(state, action);
    default:
      return state;
  }
};
