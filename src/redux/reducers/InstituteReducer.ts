import { InstituteAction, RegisterFailure, RegisterSuccess, SaveRequest, VerifyFailure, VerifySuccess } from '..';
import { InstituteDetail } from '../../data';
import { ResponseError } from '../../utils';
import { REGISTER_INSTITUTE_FAILURE, REGISTER_INSTITUTE_REQUEST, REGISTER_INSTITUTE_SUCCESS, SAVE_INSTITUTE, VERIFY_INSTITUTE_FAILURE, VERIFY_INSTITUTE_REQUEST, VERIFY_INSTITUTE_SUCCESS } from '../constants';

/* ------------- State ------------- */
type InstituteStateType = typeof initialState;
export interface InstituteState extends InstituteStateType {}

const initialState = {
  isLoading: false,
  institute: undefined as InstituteDetail | undefined,
  isRegistered: undefined as boolean | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const verifyRequest = (state: InstituteState): InstituteState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const verifySuccess = (state: InstituteState, action: VerifySuccess): InstituteState => ({
  ...state,
  institute: action.institute,
  isLoading: false,
  error: undefined,
});

const verifyFailure = (state: InstituteState, action: VerifyFailure): InstituteState => ({
  ...state,
  institute: undefined,
  isLoading: false,
  error: action.error,
});

const registerRequest = (state: InstituteState): InstituteState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const registerSuccess = (state: InstituteState, action: RegisterSuccess): InstituteState => ({
  ...state,
  isLoading: false,
  isRegistered: action.isRegistered,
  error: undefined,
});

const registerFailure = (state: InstituteState, action: RegisterFailure): InstituteState => ({
  ...state,
  isLoading: false,
  isRegistered: false,
  error: action.error,
});

const save = (state: InstituteState, action: SaveRequest): InstituteState => ({
  ...state,
  institute: action.institute,
});

export const InstituteReducer = (state: InstituteState | undefined = initialState, action: InstituteAction): InstituteState => {
  switch (action.type) {
    case VERIFY_INSTITUTE_REQUEST:
      return verifyRequest(state);
    case VERIFY_INSTITUTE_SUCCESS:
      return verifySuccess(state, action);
    case VERIFY_INSTITUTE_FAILURE:
      return verifyFailure(state, action);
    case SAVE_INSTITUTE:
      return save(state, action);
    case REGISTER_INSTITUTE_REQUEST:
      return registerRequest(state);
    case REGISTER_INSTITUTE_SUCCESS:
      return registerSuccess(state, action);
    case REGISTER_INSTITUTE_FAILURE:
      return registerFailure(state, action);
    default:
      return state;
  }
};
