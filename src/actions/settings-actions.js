import { createAction } from 'redux-actions';
import * as textActions from './texts-actions';
import getRandomText from '../services/get-content';

export const settingsActionTypes = {
  updateLang: 'updateLang',
  toggleDisplayTextReadedBox: 'toggleDisplayTextReadedBox'
};

export const _updateLang = createAction(settingsActionTypes.updateLang);
export const _toggleDisplayTextReadedBox = createAction(settingsActionTypes.toggleDisplayTextReadedBox);

export function updateLang(lang) {
  return function (dispatch, getState) {
    const textToRead = getRandomText(lang.code);
    window.localStorage.setItem('lang', lang.code);
    
    dispatch(textActions.updateTextReaded(''));
    dispatch(textActions.updateInterimText(''));
    dispatch(textActions.updateTextToRead(textToRead));
    dispatch(_updateLang(lang));
  }
}

export function toggleDisplayTextReadedBox() {
  return function (dispatch, getState) {
    localStorage.setItem('displayTextReadedBox', !getState().settings.displayTextReadedBox);
    dispatch(_toggleDisplayTextReadedBox());
  }
}

