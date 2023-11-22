import { LearnWithVideoResponse } from '../../data';
import { ResponseError } from '../../utils';
import { LearnWithVideoAction, LearnWithVideoFailure, LearnWithVideoSuccess } from '../actions';
import { LEARN_WITH_VIDEO_FAILURE, LEARN_WITH_VIDEO_REQUEST, LEARN_WITH_VIDEO_SUCCESS } from '../constants';

/* ------------- State ------------- */
type LearnWithVideoStateType = typeof initialState;
export interface LearnWithVideoState extends LearnWithVideoStateType {}

const initialState = {
  learnWithVideos: undefined as LearnWithVideoResponse | undefined,
  isLoading: false,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const learnWithVideoRequest = (state: LearnWithVideoState): LearnWithVideoState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const learnWithVideoSuccess = (state: LearnWithVideoState, action: LearnWithVideoSuccess): LearnWithVideoState => ({
  ...state,
  learnWithVideos: action.learnWithVideo,
  isLoading: false,
  error: undefined,
});

const learnWithVideoFailure = (state: LearnWithVideoState, action: LearnWithVideoFailure): LearnWithVideoState => ({
  ...state,
  learnWithVideos: undefined,
  isLoading: false,
  error: action.error,
});

export const LearnWithVideoReducer = (state: LearnWithVideoState | undefined = initialState, action: LearnWithVideoAction): LearnWithVideoState => {
  switch (action.type) {
    case LEARN_WITH_VIDEO_REQUEST:
      return learnWithVideoRequest(state);
    case LEARN_WITH_VIDEO_SUCCESS:
      return learnWithVideoSuccess(state, action);
    case LEARN_WITH_VIDEO_FAILURE:
      return learnWithVideoFailure(state, action);
    default:
      return state;
  }
};
