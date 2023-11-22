import { CLEAR_MESSAGE, INTRODUCTION, SHOW_MESSAGE } from '../constants';

/* ------------- Types ------------- */
export type ShowMessage = ReturnType<typeof showMessage>;
export type ClearMessage = ReturnType<typeof clearMessage>;
export type Introduction = ReturnType<typeof introduction>;

export type UiAction = ShowMessage | ClearMessage | Introduction;

/* ------------- Actions ------------- */
export const showMessage = (params: { message: string; isError?: boolean }) =>
  <const>{
    type: SHOW_MESSAGE,
    ...params,
  };

export const clearMessage = () =>
  <const>{
    type: CLEAR_MESSAGE,
  };

export const introduction = (params: { isIntroduction: boolean }) =>
  <const>{
    type: INTRODUCTION,
    ...params,
  };
