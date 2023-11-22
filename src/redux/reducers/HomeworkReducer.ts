import { HomeworkAction, HomeworksFailure, HomeworksSuccess } from '..';
import { HomeworkDetail } from '../../data';
import { ResponseError } from '../../utils';
import { HOMEWORKS_FAILURE, HOMEWORKS_REQUEST, HOMEWORKS_SUCCESS } from '../constants';

/* ------------- State ------------- */
type HomeworkStateType = typeof initialState;
export interface HomeworkState extends HomeworkStateType {}

const initialState = {
  isLoading: false,
  homeworks: undefined as HomeworkDetail[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const homeworksRequest = (state: HomeworkState): HomeworkState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const homeworksSuccess = (state: HomeworkState, action: HomeworksSuccess): HomeworkState => ({
  ...state,
  homeworks: action.homeworks,
  isLoading: false,
  error: undefined,
});

const homeworksFailure = (state: HomeworkState, action: HomeworksFailure): HomeworkState => ({
  ...state,
  homeworks: undefined,
  isLoading: false,
  error: action.error,
});

export const HomeworkReducer = (state: HomeworkState | undefined = initialState, action: HomeworkAction): HomeworkState => {
  switch (action.type) {
    case HOMEWORKS_REQUEST:
      return homeworksRequest(state);
    case HOMEWORKS_SUCCESS:
      return homeworksSuccess(state, action);
    case HOMEWORKS_FAILURE:
      return homeworksFailure(state, action);
    default:
      return state;
  }
};
