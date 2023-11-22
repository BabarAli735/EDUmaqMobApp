import { RecommendedLessonsResponse } from '../../data';
import { ResponseError } from '../../utils';
import { RecommendedLessonsAction, RecommendedLessonsFailure, RecommendedLessonsSuccess } from '../actions';
import { RECOMMENDED_LESSONS_FAILURE, RECOMMENDED_LESSONS_REQUEST, RECOMMENDED_LESSONS_SUCCESS } from '../constants';

/* ------------- State ------------- */
type RecommendedLessonsStateType = typeof initialState;
export interface RecommendedLessonsState extends RecommendedLessonsStateType {}

const initialState = {
  recommendedLessons: undefined as RecommendedLessonsResponse | undefined,
  isLoading: false,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const recommendedLessonsRequest = (state: RecommendedLessonsState): RecommendedLessonsState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const recommendedLessonsSuccess = (state: RecommendedLessonsState, action: RecommendedLessonsSuccess): RecommendedLessonsState => ({
  ...state,
  recommendedLessons: action.lessons,
  isLoading: false,
  error: undefined,
});

const recommendedLessonsFailure = (state: RecommendedLessonsState, action: RecommendedLessonsFailure): RecommendedLessonsState => ({
  ...state,
  recommendedLessons: undefined,
  isLoading: false,
  error: action.error,
});

export const RecommendedLessonsReducer = (state: RecommendedLessonsState | undefined = initialState, action: RecommendedLessonsAction): RecommendedLessonsState => {
  switch (action.type) {
    case RECOMMENDED_LESSONS_REQUEST:
      return recommendedLessonsRequest(state);
    case RECOMMENDED_LESSONS_SUCCESS:
      return recommendedLessonsSuccess(state, action);
    case RECOMMENDED_LESSONS_FAILURE:
      return recommendedLessonsFailure(state, action);
    default:
      return state;
  }
};
