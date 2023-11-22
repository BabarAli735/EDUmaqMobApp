import { AuthAction, LoginFailure, LoginSuccess, RehydrateAction } from '..';
import { Profile, TeacherProfile } from '../../data';
import { ResponseError } from '../../utils';
import { AFTER_REHYDRATE, LOGIN_FAILURE, LOGIN_MOBILE_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from '../constants';

/* ------------- State ------------- */
type AuthStateType = typeof initialState;
export interface AuthState extends AuthStateType {}

const initialState = {
  isLoading: false,
  profile: undefined as Profile | TeacherProfile | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const loginRequest = (state: AuthState): AuthState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const loginSuccess = (state: AuthState, action: LoginSuccess): AuthState => ({
  ...state,
  profile: action.profile,
  isLoading: false,
  error: undefined,
});

const loginFailure = (state: AuthState, action: LoginFailure): AuthState => ({
  ...state,
  profile: undefined,
  isLoading: false,
  error: action.error,
});

const logOut = (): AuthState => ({
  ...initialState,
});

const afterRehydrate = (state: AuthState): AuthState => ({
  ...state,
  ...initialState,
});

export const AuthReducer = (state: AuthState | undefined = initialState, action: AuthAction | RehydrateAction): AuthState => {
  switch (action.type) {
    case LOGIN_MOBILE_REQUEST:
      return loginRequest(state);
    case LOGIN_REQUEST:
      return loginRequest(state);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOGIN_FAILURE:
      return loginFailure(state, action);
    case LOG_OUT:
      return logOut();
    case AFTER_REHYDRATE:
      return afterRehydrate(state);
    default:
      return state;
  }
};
