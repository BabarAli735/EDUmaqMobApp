import { AFTER_REHYDRATE } from '../constants';

/* ------------- Types ------------- */
export type AfterRehydrate = ReturnType<typeof afterRehydrate>;

export type RehydrateAction = AfterRehydrate;

/* ------------- Actions ------------- */
export const afterRehydrate = () =>
  <const>{
    type: AFTER_REHYDRATE,
  };
