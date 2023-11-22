import { Profile } from '../../data';
import { ResponseError } from '../../utils';
import { SIBLINGS_FAILURE, SIBLINGS_REQUEST, SIBLINGS_SUCCESS, SWITCH_SIBLINGS_FAILURE, SWITCH_SIBLINGS_REQ, SWITCH_SIBLINGS_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface SiblingRequest extends ReturnType<typeof siblingRequest> {}
export interface SiblingSuccess extends ReturnType<typeof siblingSuccess> {}
export interface SiblingFailure extends ReturnType<typeof siblingFailed> {}

export interface SwitchSiblingRequest extends ReturnType<typeof switchSiblingRequest> {}
export interface SwitchSiblingSuccess extends ReturnType<typeof switchSiblingSuccess> {}
export interface SwitchSiblingFailure extends ReturnType<typeof switchSiblingFailed> {}

export type SiblingAction = SiblingRequest | SiblingSuccess | SiblingFailure|SwitchSiblingRequest|SwitchSiblingSuccess|SwitchSiblingFailure;

export const siblingRequest = (params: { id: number } & WithCallbacks) =>
  <const>{
    type: SIBLINGS_REQUEST,
    ...params,
  };

export const siblingSuccess = (siblings: Profile[]) =>
  <const>{
    type: SIBLINGS_SUCCESS,
    siblings: siblings,
  };

export const siblingFailed = (error: ResponseError) =>
  <const>{
    type: SIBLINGS_FAILURE,
    error: error,
  };



export const switchSiblingRequest = (params: { id: number } & WithCallbacks) =>
<const>{
  type: SWITCH_SIBLINGS_REQ,
  ...params,
};

export const switchSiblingSuccess = (switchSiblings: any) =>
<const>{
  type: SWITCH_SIBLINGS_SUCCESS,
  switchSibling: switchSiblings,
};

export const switchSiblingFailed = (error: ResponseError) =>
<const>{
  type: SWITCH_SIBLINGS_FAILURE,
  error: error,
};
