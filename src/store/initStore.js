import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const middleWare = [thunk];
const middleWareEnhancer = applyMiddleware(...middleWare);

const enhansers = [middleWareEnhancer];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhansers)
  : compose(...enhansers);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedRootReducer,
  undefined,
  composeEnhancers
);

export const persistor = persistStore(store);
