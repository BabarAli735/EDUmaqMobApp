import { FeedbackAction, FeedbackFailure, FeedbacksFailure, FeedbacksSuccess, FeedbackSuccess } from '..';
import { FeedbackDetail } from '../../data';
import { ResponseError } from '../../utils';
import { FEEDBACKS_FAILURE, FEEDBACKS_REQUEST, FEEDBACKS_SUCCESS, FEEDBACK_FAILURE, FEEDBACK_REQUEST, FEEDBACK_SUCCESS } from '../constants';

/* ------------- State ------------- */
type FeedbackStateType = typeof initialState;
export interface FeedbackState extends FeedbackStateType {}

const initialState = {
  isLoading: false,
  feedbacks: undefined as FeedbackDetail[] | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const feedbacksRequest = (state: FeedbackState): FeedbackState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const feedbacksSuccess = (state: FeedbackState, action: FeedbacksSuccess): FeedbackState => ({
  ...state,
  feedbacks: action.feedbacks,
  isLoading: false,
  error: undefined,
});

const feedbacksFailure = (state: FeedbackState, action: FeedbacksFailure): FeedbackState => ({
  ...state,
  feedbacks: undefined,
  isLoading: false,
  error: action.error,
});

const feedbackRequest = (state: FeedbackState): FeedbackState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const feedbackSuccess = (state: FeedbackState, action: FeedbackSuccess): FeedbackState => ({
  ...state,
  feedbacks: state.feedbacks?.concat([action.feedback]),
  isLoading: false,
  error: undefined,
});

const feedbackFailure = (state: FeedbackState, action: FeedbackFailure): FeedbackState => ({
  ...state,
  isLoading: false,
  error: action.error,
});

export const FeedbackReducer = (state: FeedbackState | undefined = initialState, action: FeedbackAction): FeedbackState => {
  switch (action.type) {
    case FEEDBACKS_REQUEST:
      return feedbacksRequest(state);
    case FEEDBACKS_SUCCESS:
      return feedbacksSuccess(state, action);
    case FEEDBACKS_FAILURE:
      return feedbacksFailure(state, action);
    case FEEDBACK_REQUEST:
      return feedbackRequest(state);
    case FEEDBACK_SUCCESS:
      return feedbackSuccess(state, action);
    case FEEDBACK_FAILURE:
      return feedbackFailure(state, action);
    default:
      return state;
  }
};
