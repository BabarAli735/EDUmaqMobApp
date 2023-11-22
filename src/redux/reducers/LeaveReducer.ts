import { LeaveAction, LeaveFailure, LeavesFailure, LeavesRequest, LeavesSuccess, LeaveSuccess } from '..';
import { LeaveDetail } from '../../data';
import { ResponseError } from '../../utils';
import { LEAVES_FAILURE, LEAVES_REQUEST, LEAVES_SUCCESS, LEAVE_FAILURE, LEAVE_REQUEST, LEAVE_SUCCESS } from '../constants';

/* ------------- State ------------- */
type LeaveStateType = typeof initialState;
export interface LeaveState extends LeaveStateType {}

const initialState = {
  isLoading: false,
  leaves: undefined as LeaveDetail[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const leavesRequest = (state: LeaveState): LeaveState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const leavesSuccess = (state: LeaveState, action: LeavesSuccess): LeaveState => ({
  ...state,
  leaves: action.leaves,
  isLoading: false,
  error: undefined,
});

const leavesFailure = (state: LeaveState, action: LeavesFailure): LeaveState => ({
  ...state,
  leaves: undefined,
  isLoading: false,
  error: action.error,
});

const leaveRequest = (state: LeaveState): LeaveState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const leaveSuccess = (state: LeaveState, action: LeaveSuccess): LeaveState => ({
  ...state,
  leaves: state.leaves?.concat([action.leave]),
  isLoading: false,
  error: undefined,
});

const leaveFailure = (state: LeaveState, action: LeaveFailure): LeaveState => ({
  ...state,
  isLoading: false,
  error: action.error,
});

export const LeaveReducer = (state: LeaveState | undefined = initialState, action: LeaveAction): LeaveState => {
  switch (action.type) {
    case LEAVES_REQUEST:
      return leavesRequest(state);
    case LEAVES_SUCCESS:
      return leavesSuccess(state, action);
    case LEAVES_FAILURE:
      return leavesFailure(state, action);
    case LEAVE_REQUEST:
      return leaveRequest(state);
    case LEAVE_SUCCESS:
      return leaveSuccess(state, action);
    case LEAVE_FAILURE:
      return leaveFailure(state, action);
    default:
      return state;
  }
};
