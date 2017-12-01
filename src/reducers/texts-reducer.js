import { handleActions } from 'redux-actions';
import {
  textActionTypes
} from '../actions/texts-actions'
import getRandomText from '../services/get-content';

const defaultState = {
  textToRead: getRandomText((window.localStorage && window.localStorage.getItem('lang')) || 'en'),
  textReaded: '',
  interimText: ''
};

const reducers = {};

reducers[textActionTypes.updateTextToRead] = (state, action) => {
  return {
    ...state,
    textToRead: action.payload
  };
};

reducers[textActionTypes.updateTextReaded] = (state, action) => {
  return {
    ...state,
    textReaded: action.payload
  };
};

reducers[textActionTypes.updateInterimText] = (state, action) => {
  return {
    ...state,
    interimText: action.payload
  };
};

export default handleActions(reducers, defaultState);