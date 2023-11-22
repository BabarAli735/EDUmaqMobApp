import { MyCoursesResponse } from '../../data';
import { ResponseError } from '../../utils';
import { WithCallbacks } from '../RootTypes';
import { MY_COURSE_FAILURE, MY_COURSE_REQUEST, MY_COURSE_SUCCESS } from '../constants';

/* ------------- Types ------------- */
export interface MyCoursesRequest extends ReturnType<typeof myCoursesRequest> {}
export interface MyCoursesSuccess extends ReturnType<typeof myCoursesSuccess> {}
export interface MyCoursesFailure extends ReturnType<typeof myCoursesFailed> {}

export type MyCoursesAction = MyCoursesRequest | MyCoursesSuccess | MyCoursesFailure;

export const myCoursesRequest = (params: { classId?: number; batchId?: number } & WithCallbacks) =>
  <const>{
    type: MY_COURSE_REQUEST,
    ...params,
  };

export const myCoursesSuccess = (courses: MyCoursesResponse) =>
  <const>{
    type: MY_COURSE_SUCCESS,
    courses: courses,
  };

export const myCoursesFailed = (error: ResponseError) =>
  <const>{
    type: MY_COURSE_FAILURE,
    error: error,
  };
