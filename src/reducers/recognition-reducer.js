import { handleActions } from 'redux-actions';
import {
  recognitionActionTypes
} from '../actions/recognition-actions'

const defaultState = {
  talking: false,
};

const reducers = {};

reducers[recognitionActionTypes.updateTalking] = (state, action) => {
  return {
    ...state,
    talking: action.payload
  };
};

export default handleActions(reducers, defaultState);