import { SyllabusAction, SyllabusFailure, SyllabusSuccess } from '..';
import { Syllabus } from '../../data';
import { ResponseError } from '../../utils';
import { SYLLABUS_FAILURE, SYLLABUS_REQUEST, SYLLABUS_SUCCESS } from '../constants';

/* ------------- State ------------- */
type SyllabusStateType = typeof initialState;
export interface SyllabusState extends SyllabusStateType {}

const initialState = {
  isLoading: false,
  syllabus: undefined as Syllabus[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const syllabusRequest = (state: SyllabusState): SyllabusState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const syllabusSuccess = (state: SyllabusState, action: SyllabusSuccess): SyllabusState => ({
  ...state,
  syllabus: action.syllabus,
  isLoading: false,
  error: undefined,
});

const syllabusFailure = (state: SyllabusState, action: SyllabusFailure): SyllabusState => ({
  ...state,
  syllabus: undefined,
  isLoading: false,
  error: action.error,
});

export const SyllabusReducer = (state: SyllabusState | undefined = initialState, action: SyllabusAction): SyllabusState => {
  switch (action.type) {
    case SYLLABUS_REQUEST:
      return syllabusRequest(state);
    case SYLLABUS_SUCCESS:
      return syllabusSuccess(state, action);
    case SYLLABUS_FAILURE:
      return syllabusFailure(state, action);
    default:
      return state;
  }
};
