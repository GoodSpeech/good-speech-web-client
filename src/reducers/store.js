import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import texts from './texts-reducer';
import recognition from './recognition-reducer';
import settings from './settings-reducer';
import log from 'loglevel';

const reducers = combineReducers({
  texts,
  recognition,
  settings
});

let middlewares = applyMiddleware(thunkMiddleware);

if (process.env.NODE_ENV !== 'production') {
  log.enableAll();
  middlewares = applyMiddleware(thunkMiddleware, createLogger());
}

export default createStore(reducers, middlewares);
