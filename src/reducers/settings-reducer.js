import { handleActions } from 'redux-actions';
import {
  settingsActionTypes
} from '../actions/settings-actions'
import supportedLanguages from '../i18n/langs';

function getDefaultLanguage() {
  const code = (window.localStorage && window.localStorage.getItem('lang')) || 'en-US';
  return supportedLanguages.find(lang => lang.code === code);
}

function getDefaultDisplayTextReadedBox() {
  return (window.localStorage && window.localStorage.getItem('displayTextReadedBox') === 'true') || false;
}

const defaultState = {
  lang: getDefaultLanguage(),
  displayTextReadedBox: getDefaultDisplayTextReadedBox()
};

const reducers = {};

reducers[settingsActionTypes.updateLang] = (state, action) => {
  return {
    ...state,
    lang: action.payload
  };
};

reducers[settingsActionTypes.toggleDisplayTextReadedBox] = (state, action) => {
  return {
    ...state,
    displayTextReadedBox: !state.displayTextReadedBox
  };
};

export default handleActions(reducers, defaultState);