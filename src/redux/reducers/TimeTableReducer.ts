import { TimeTableAction, TimeTableFailure, TimeTableSuccess } from '..';
import { TimeTable } from '../../data';
import { ResponseError } from '../../utils';
import { TIME_TABLE_FAILURE, TIME_TABLE_REQUEST, TIME_TABLE_SUCCESS } from '../constants';

/* ------------- State ------------- */
type TimeTableStateType = typeof initialState;
export interface TimeTableState extends TimeTableStateType {}

const initialState = {
  isLoading: false,
  timeTable: undefined as TimeTable[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const timeTableRequest = (state: TimeTableState): TimeTableState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const timeTableSuccess = (state: TimeTableState, action: TimeTableSuccess): TimeTableState => ({
  ...state,
  timeTable: action.timeTable,
  isLoading: false,
  error: undefined,
});

const timeTableFailure = (state: TimeTableState, action: TimeTableFailure): TimeTableState => ({
  ...state,
  timeTable: undefined,
  isLoading: false,
  error: action.error,
});

export const TimeTableReducer = (state: TimeTableState | undefined = initialState, action: TimeTableAction): TimeTableState => {
  switch (action.type) {
    case TIME_TABLE_REQUEST:
      return timeTableRequest(state);
    case TIME_TABLE_SUCCESS:
      return timeTableSuccess(state, action);
    case TIME_TABLE_FAILURE:
      return timeTableFailure(state, action);
    default:
      return state;
  }
};
