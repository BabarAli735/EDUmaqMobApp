import { SiblingAction, SiblingFailure, SiblingSuccess, SwitchSiblingFailure, SwitchSiblingSuccess } from '..';
import { Profile } from '../../data';
import { ResponseError } from '../../utils';
import { SIBLINGS_FAILURE, SIBLINGS_REQUEST, SIBLINGS_SUCCESS, SWITCH_SIBLINGS_FAILURE, SWITCH_SIBLINGS_REQ, SWITCH_SIBLINGS_SUCCESS } from '../constants';

/* ------------- State ------------- */
type SiblingStateType = typeof initialState;
export interface SiblingState extends SiblingStateType {}

const initialState = {
  isLoading: false,
  siblings: undefined as Profile[] | undefined,
  error: undefined as ResponseError | undefined,
  switchSibling:null
};

/* ------------- Reducers ------------- */
const siblingRequest = (state: SiblingState): SiblingState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const siblingSuccess = (state: SiblingState, action: SiblingSuccess): SiblingState => ({
  ...state,
  siblings: action.siblings,
  isLoading: false,
  error: undefined,
});

const siblingFailure = (state: SiblingState, action: SiblingFailure): SiblingState => ({
  ...state,
  siblings: undefined,
  isLoading: false,
  error: action.error,
});


const switchSiblingRequest = (state: SiblingState): SiblingState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const switchSiblingSuccess = (state: SiblingState, action: SwitchSiblingSuccess): SiblingState => ({
  ...state,
  switchSibling: action.switchSibling,
  isLoading: false,
  error: undefined,
});

const switchSiblingFailure = (state: SiblingState, action: SwitchSiblingFailure): SiblingState => ({
  ...state,
  siblings: undefined,
  isLoading: false,
  error: action.error,
});


export const SiblingReducer = (state: SiblingState | undefined = initialState, action: SiblingAction): SiblingState => {
  switch (action.type) {
    case SIBLINGS_REQUEST:
      return siblingRequest(state);
    case SIBLINGS_SUCCESS:
      return siblingSuccess(state, action);
    case SIBLINGS_FAILURE:
      return siblingFailure(state, action);

      case SWITCH_SIBLINGS_REQ:
      return switchSiblingRequest(state);
    case SWITCH_SIBLINGS_SUCCESS:
      return switchSiblingSuccess(state, action);
    case SWITCH_SIBLINGS_FAILURE:
      return switchSiblingFailure(state, action);
    default:
      return state;
  }
};
