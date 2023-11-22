import { Store } from 'redux';
import { RootAction, RootState } from './RootTypes';

let _store: Store<RootState, RootAction>;

const setStoreReference = (storeRef: Store<RootState, RootAction>) => {
  _store = storeRef;
};

const getState = () => _store.getState();

const dispatch = (action: RootAction) => {
  _store.dispatch(action);
};

export default {
  setStoreReference,
  getState,
  dispatch,
};
