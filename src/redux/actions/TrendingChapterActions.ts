import { TrendingChapterResponse } from '../../data';
import { ResponseError } from '../../utils';
import { WithCallbacks } from '../RootTypes';
import { TRENDING_CHAPTER_FAILURE, TRENDING_CHAPTER_REQUEST, TRENDING_CHAPTER_SUCCESS } from '../constants';

/* ------------- Types ------------- */
export interface TrendingChapterRequest extends ReturnType<typeof trendingChapterRequest> {}
export interface TrendingChapterSuccess extends ReturnType<typeof trendingChapterSuccess> {}
export interface TrendingChapterFailure extends ReturnType<typeof trendingChapterFailed> {}

export type TrendingChapterAction = TrendingChapterRequest | TrendingChapterSuccess | TrendingChapterFailure;

export const trendingChapterRequest = (params: { classId?: number; batchId?: number } & WithCallbacks) =>
  <const>{
    type: TRENDING_CHAPTER_REQUEST,
    ...params,
  };

export const trendingChapterSuccess = (trending: TrendingChapterResponse) =>
  <const>{
    type: TRENDING_CHAPTER_SUCCESS,
    trending: trending,
  };

export const trendingChapterFailed = (error: ResponseError) =>
  <const>{
    type: TRENDING_CHAPTER_FAILURE,
    error: error,
  };
