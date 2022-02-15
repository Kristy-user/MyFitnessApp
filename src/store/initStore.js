import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const middleWare = [];
const middleWareEnhancer = applyMiddleware(...middleWare);

const enhansers = [middleWareEnhancer];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__(...enhansers)
  : compose(...enhansers);

const store = createStore(rootReducer, undefined, composeEnhancers);

export default store;
