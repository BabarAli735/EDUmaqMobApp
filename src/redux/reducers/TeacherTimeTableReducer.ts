import { TeacherTimeTable } from '../../data/model/TeacherTimeTable';
import { ResponseError } from '../../utils';
import { TeacherTimeTableAction, TeacherTimeTableFailure, TeacherTimeTableSuccess } from '../actions/TeacherTimeTableActions';
import { TEACHER_TIME_TABLE_FAILURE, TEACHER_TIME_TABLE_REQUEST, TEACHER_TIME_TABLE_SUCCESS } from '../constants/TeacherTimeTableConstants';

/* ------------- State ------------- */
type TeacherTimeTableStateType = typeof initialState;
export interface TeacherTimeTableState extends TeacherTimeTableStateType {}

const initialState = {
  isLoading: false,
  teacherTimeTable: undefined as TeacherTimeTable[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const teacherTimeTableRequest = (state: TeacherTimeTableState): TeacherTimeTableState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const teacherTimeTableSuccess = (state: TeacherTimeTableState, action: TeacherTimeTableSuccess): TeacherTimeTableState => ({
  ...state,
  teacherTimeTable: action.teacherTimeTable,
  isLoading: false,
  error: undefined,
});

const teacherTimeTableFailure = (state: TeacherTimeTableState, action: TeacherTimeTableFailure): TeacherTimeTableState => ({
  ...state,
  teacherTimeTable: undefined,
  isLoading: false,
  error: action.error,
});

export const TeacherTimeTableReducer = (state: TeacherTimeTableState | undefined = initialState, action: TeacherTimeTableAction): TeacherTimeTableState => {
  switch (action.type) {
    case TEACHER_TIME_TABLE_REQUEST:
      return teacherTimeTableRequest(state);
    case TEACHER_TIME_TABLE_SUCCESS:
      return teacherTimeTableSuccess(state, action);
    case TEACHER_TIME_TABLE_FAILURE:
      return teacherTimeTableFailure(state, action);
    default:
      return state;
  }
};
