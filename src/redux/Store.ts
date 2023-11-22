import { applyMiddleware, createStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { afterRehydrate } from './actions';
import { rootReducer } from './RootReducer';
import { rootSaga } from './RootSaga';
import StoreService from './StoreService';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (!__DEV__) {
  middleware.push(createLogger({}));
}

export const store = createStore(rootReducer as Reducer, undefined, composeWithDevTools(applyMiddleware(...middleware)));
export const persister = persistStore(store, undefined, () => store.dispatch(afterRehydrate()));

StoreService.setStoreReference(store);

sagaMiddleware && sagaMiddleware.run(rootSaga);
