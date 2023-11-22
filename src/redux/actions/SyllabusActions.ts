import { Syllabus } from '../../data';
import { ResponseError } from '../../utils';
import { SYLLABUS_FAILURE, SYLLABUS_REQUEST, SYLLABUS_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface SyllabusRequest extends ReturnType<typeof syllabusRequest> {}
export interface SyllabusSuccess extends ReturnType<typeof syllabusSuccess> {}
export interface SyllabusFailure extends ReturnType<typeof syllabusFailed> {}

export type SyllabusAction = SyllabusRequest | SyllabusSuccess | SyllabusFailure;

export const syllabusRequest = (params: { id?: number } & WithCallbacks) =>
  <const>{
    type: SYLLABUS_REQUEST,
    ...params,
  };

export const syllabusSuccess = (syllabus: Syllabus[]) =>
  <const>{
    type: SYLLABUS_SUCCESS,
    syllabus: syllabus,
  };

export const syllabusFailed = (error: ResponseError) =>
  <const>{
    type: SYLLABUS_FAILURE,
    error: error,
  };
