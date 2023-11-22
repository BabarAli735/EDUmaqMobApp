import { MobileAction, SendOTPFailure, SendOTPSuccess, VerifyOTPFailure, VerifyOTPSuccess } from '..';
import { ResponseError } from '../../utils';
import { SEND_OTP_FAILURE, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, VERIFY_OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS } from '../constants';

/* ------------- State ------------- */
type MobileOTPStateType = typeof initialState;
export interface MobileOTPState extends MobileOTPStateType {}

const initialState = {
  isLoading: false,
  isOTPSend: undefined as boolean | undefined,
  isOTPVerified: undefined as boolean | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const sendOTPRequest = (state: MobileOTPState): MobileOTPState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const sendOTPSuccess = (state: MobileOTPState, action: SendOTPSuccess): MobileOTPState => ({
  ...state,
  isOTPSend: action.isOTPSend,
  isLoading: false,
  error: undefined,
});

const sendOTPFailure = (state: MobileOTPState, action: SendOTPFailure): MobileOTPState => ({
  ...state,
  isOTPSend: undefined,
  isLoading: false,
  error: action.error,
});

const verifyOTPRequest = (state: MobileOTPState): MobileOTPState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const verifyOTPSuccess = (state: MobileOTPState, action: VerifyOTPSuccess): MobileOTPState => ({
  ...state,
  isOTPVerified: action.isOTPVerified,
  isLoading: false,
  error: undefined,
});

const verifyOTPFailure = (state: MobileOTPState, action: VerifyOTPFailure): MobileOTPState => ({
  ...state,
  isOTPVerified: undefined,
  isLoading: false,
  error: action.error,
});

export const MobileReducer = (state: MobileOTPState | undefined = initialState, action: MobileAction): MobileOTPState => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
      return sendOTPRequest(state);
    case SEND_OTP_SUCCESS:
      return sendOTPSuccess(state, action);
    case SEND_OTP_FAILURE:
      return sendOTPFailure(state, action);
    case VERIFY_OTP_REQUEST:
      return verifyOTPRequest(state);
    case VERIFY_OTP_SUCCESS:
      return verifyOTPSuccess(state, action);
    case VERIFY_OTP_FAILURE:
      return verifyOTPFailure(state, action);
    default:
      return state;
  }
};
