
import { AttendanceTeacherResponse } from '../../data';
import { ResponseError } from '../../utils';
import { AttendanceTeacherAction,AttendanceTeacherFailure, AttendanceTeacherSuccess  } from '../actions/AttendanceTeacherActions';
import { ATTENDANCE_TEACHER_FAILURE, ATTENDANCE_TEACHER_REQUEST, ATTENDANCE_TEACHER_SUCCESS } from '../constants/AttendanceTeacherConstants';

/* ------------- State ------------- */
type AttendanceTeacherStateType = typeof initialState;
export interface AttendanceTeacherState extends AttendanceTeacherStateType {}

const initialState = {
  isLoading: false,
  attendancesTeacher: undefined as AttendanceTeacherResponse | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const attendanceTeacherRequest = (state: AttendanceTeacherState): AttendanceTeacherState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const attendanceTeacherSuccess = (state: AttendanceTeacherState, action: AttendanceTeacherSuccess): AttendanceTeacherState => ({
  ...state,
  attendancesTeacher: action.attendancesTeacher,
  isLoading: false,
  error: undefined,
});

const attendanceTeacherFailure = (state: AttendanceTeacherState, action: AttendanceTeacherFailure): AttendanceTeacherState => ({
  ...state,
  attendancesTeacher: undefined,
  isLoading: false,
  error: action.error,
});


export const AttendanceTeacherReducer = (state: AttendanceTeacherState | undefined = initialState, action: AttendanceTeacherAction): AttendanceTeacherState => {
  switch (action.type) {
    case ATTENDANCE_TEACHER_REQUEST:
      return attendanceTeacherRequest(state);
    case ATTENDANCE_TEACHER_SUCCESS:
      return attendanceTeacherSuccess(state, action);
    case ATTENDANCE_TEACHER_FAILURE:
      return attendanceTeacherFailure(state, action);
    default:
      return state;
  }
};

