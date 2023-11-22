import { City, Country, State } from '../../data';
import { ResponseError } from '../../utils';
import { MASTER_FAILURE, MASTER_REQUEST, MASTER_SUCCESS } from '../constants';
import { WithCallbacks } from '../RootTypes';

/* ------------- Types ------------- */
export interface MasterRequest extends ReturnType<typeof masterRequest> {}
export interface MasterSuccess extends ReturnType<typeof masterSuccess> {}
export interface MasterFailure extends ReturnType<typeof masterFailed> {}

export type MasterAction = MasterRequest | MasterSuccess | MasterFailure;

export const masterRequest = (params: WithCallbacks) =>
  <const>{
    type: MASTER_REQUEST,
    ...params,
  };

export const masterSuccess = (country: Country[], state: State[], city: City[]) =>
  <const>{
    type: MASTER_SUCCESS,
    country: country,
    state: state,
    city: city,
  };

export const masterFailed = (error: ResponseError) =>
  <const>{
    type: MASTER_FAILURE,
    error: error,
  };
