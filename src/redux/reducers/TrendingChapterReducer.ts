import { TrendingChapterResponse } from '../../data';
import { ResponseError } from '../../utils';
import { TrendingChapterAction, TrendingChapterFailure, TrendingChapterSuccess } from '../actions';
import { TRENDING_CHAPTER_FAILURE, TRENDING_CHAPTER_REQUEST, TRENDING_CHAPTER_SUCCESS } from '../constants';

/* ------------- State ------------- */
type TrendingChapterStateType = typeof initialState;
export interface TrendingChapterState extends TrendingChapterStateType {}

const initialState = {
  trendingChapters: undefined as TrendingChapterResponse | undefined,
  isLoading: false,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const trendingChapterRequest = (state: TrendingChapterState): TrendingChapterState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const trendingChapterSuccess = (state: TrendingChapterState, action: TrendingChapterSuccess): TrendingChapterState => ({
  ...state,
  trendingChapters: action.trending,
  isLoading: false,
  error: undefined,
});

const trendingChapterFailure = (state: TrendingChapterState, action: TrendingChapterFailure): TrendingChapterState => ({
  ...state,
  trendingChapters: undefined,
  isLoading: false,
  error: action.error,
});

export const TrendingChapterReducer = (state: TrendingChapterState | undefined = initialState, action: TrendingChapterAction): TrendingChapterState => {
  switch (action.type) {
    case TRENDING_CHAPTER_REQUEST:
      return trendingChapterRequest(state);
    case TRENDING_CHAPTER_SUCCESS:
      return trendingChapterSuccess(state, action);
    case TRENDING_CHAPTER_FAILURE:
      return trendingChapterFailure(state, action);
    default:
      return state;
  }
};
