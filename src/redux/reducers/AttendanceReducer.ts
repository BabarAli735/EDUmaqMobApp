import { AttendanceAction, AttendanceFailure, AttendanceSuccess } from '..';
import { AttendanceResponse } from '../../data';
import { ResponseError } from '../../utils';
import { ATTENDANCE_FAILURE, ATTENDANCE_REQUEST, ATTENDANCE_SUCCESS } from '../constants';

/* ------------- State ------------- */
type AttendanceStateType = typeof initialState;
export interface AttendanceState extends AttendanceStateType {}

const initialState = {
  isLoading: false,
  attendances: undefined as AttendanceResponse | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const attendanceRequest = (state: AttendanceState): AttendanceState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const attendanceSuccess = (state: AttendanceState, action: AttendanceSuccess): AttendanceState => ({
  ...state,
  attendances: action.attendances,
  isLoading: false,
  error: undefined,
});

const attendanceFailure = (state: AttendanceState, action: AttendanceFailure): AttendanceState => ({
  ...state,
  attendances: undefined,
  isLoading: false,
  error: action.error,
});

export const AttendanceReducer = (state: AttendanceState | undefined = initialState, action: AttendanceAction): AttendanceState => {
  switch (action.type) {
    case ATTENDANCE_REQUEST:
      return attendanceRequest(state);
    case ATTENDANCE_SUCCESS:
      return attendanceSuccess(state, action);
    case ATTENDANCE_FAILURE:
      return attendanceFailure(state, action);
    default:
      return state;
  }
};


