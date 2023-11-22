import { ClassClassworkGetReq, ClassClassworkGetSuccess, ClassClassworkGetFailure } from '..';
import { ClassClassworkDetail } from '../../data';
import { ResponseError } from '../../utils';
import { CLASS_CLASSWORK_GET_REQ, CLASS_CLASSWORK_GET_SUCCESS, CLASS_CLASSWORK_GET_FAILURE } from '../constants';

/* ------------- State ------------- */
type ClassClassworkStateType = typeof initialState;
export interface ClassClassworkState extends ClassClassworkStateType {}

const initialState = {
  isLoading: false,
  classClasswork: undefined as ClassClassworkDetail[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const classClassworkRequest = (state: ClassClassworkState): ClassClassworkState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const classClassworkSuccess = (state: ClassClassworkState, action: ClassClassworkGetSuccess): ClassClassworkState => ({
  ...state,
  classClasswork: action.classClasswork,
  isLoading: false,
  error: undefined,
});

const classClassworkFailure = (state: ClassClassworkState, action: ClassClassworkGetFailure): ClassClassworkState => ({
  ...state,
  classClasswork: undefined,
  isLoading: false,
  error: action.error,
});

export const ClassClassworkReducer = (state: ClassClassworkState | undefined = initialState, action: any): ClassClassworkState => {
  switch (action.type) {
    case CLASS_CLASSWORK_GET_REQ:
      return classClassworkRequest(state);
    case CLASS_CLASSWORK_GET_SUCCESS:
      return classClassworkSuccess(state, action);
    case CLASS_CLASSWORK_GET_FAILURE:
      return classClassworkFailure(state, action);
    default:
      return state;
  }
};
