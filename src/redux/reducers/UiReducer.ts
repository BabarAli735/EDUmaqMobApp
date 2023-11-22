import { Introduction, ShowMessage, UiAction } from '..';
import { CLEAR_MESSAGE, INTRODUCTION, SHOW_MESSAGE } from '../constants';

/* ------------- State ------------- */
type UiStateType = typeof initialState;
export interface UiState extends UiStateType {}

const initialState = {
  message: undefined as unknown as string,
  isError: undefined as unknown as boolean,
  isIntroduction: undefined as unknown as boolean,
};

/* ------------- Reducers ------------- */
const showMessage = (state: UiState, action: ShowMessage): UiState => ({
  ...state,
  message: action.message,
  isError: action.isError === true,
});

const clearMessage = (state: UiState): UiState => ({
  ...state,
  message: undefined as unknown as string,
});

const introduction = (state: UiState, action: Introduction): UiState => ({
  ...state,
  isIntroduction: action.isIntroduction,
});

export const UiReducer = (state: UiState | undefined = initialState, action: UiAction): UiState => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return showMessage(state, action);
    case CLEAR_MESSAGE:
      return clearMessage(state);
    case INTRODUCTION:
      return introduction(state, action);
    default:
      return state;
  }
};
