import { RecommendedLessonsResponse } from '../../data';
import { ResponseError } from '../../utils';
import { WithCallbacks } from '../RootTypes';
import { RECOMMENDED_LESSONS_FAILURE, RECOMMENDED_LESSONS_REQUEST, RECOMMENDED_LESSONS_SUCCESS } from '../constants';

/* ------------- Types ------------- */
export interface RecommendedLessonsRequest extends ReturnType<typeof recommendedLessonsRequest> {}
export interface RecommendedLessonsSuccess extends ReturnType<typeof recommendedLessonsSuccess> {}
export interface RecommendedLessonsFailure extends ReturnType<typeof recommendedLessonsFailed> {}

export type RecommendedLessonsAction = RecommendedLessonsRequest | RecommendedLessonsSuccess | RecommendedLessonsFailure;

export const recommendedLessonsRequest = (params: { classId?: number; batchId?: number } & WithCallbacks) =>
  <const>{
    type: RECOMMENDED_LESSONS_REQUEST,
    ...params,
  };

export const recommendedLessonsSuccess = (lessons: RecommendedLessonsResponse) =>
  <const>{
    type: RECOMMENDED_LESSONS_SUCCESS,
    lessons: lessons,
  };

export const recommendedLessonsFailed = (error: ResponseError) =>
  <const>{
    type: RECOMMENDED_LESSONS_FAILURE,
    error: error,
  };
