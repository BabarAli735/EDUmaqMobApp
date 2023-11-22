import { MasterAction, MasterFailure, MasterSuccess } from '..';
import { City, Country, State } from '../../data';
import { ResponseError } from '../../utils';
import { MASTER_FAILURE, MASTER_REQUEST, MASTER_SUCCESS } from '../constants';

/* ------------- State ------------- */
type MasterStateType = typeof initialState;
export interface MasterState extends MasterStateType {}

const initialState = {
  isLoading: false,
  country: undefined as Country[] | undefined,
  state: undefined as State[] | undefined,
  city: undefined as City[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const masterRequest = (state: MasterState): MasterState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const masterSuccess = (state: MasterState, action: MasterSuccess): MasterState => ({
  ...state,
  country: action.country,
  state: action.state,
  city: action.city,
  isLoading: false,
  error: undefined,
});

const masterFailure = (state: MasterState, action: MasterFailure): MasterState => ({
  ...state,
  country: undefined,
  state: undefined,
  city: undefined,
  isLoading: false,
  error: action.error,
});

export const MasterReducer = (state: MasterState | undefined = initialState, action: MasterAction): MasterState => {
  switch (action.type) {
    case MASTER_REQUEST:
      return masterRequest(state);
    case MASTER_SUCCESS:
      return masterSuccess(state, action);
    case MASTER_FAILURE:
      return masterFailure(state, action);
    default:
      return state;
  }
};
