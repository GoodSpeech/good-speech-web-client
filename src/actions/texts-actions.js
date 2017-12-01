import { createAction } from 'redux-actions';

export const textActionTypes = {
  updateTextToRead: 'updateTextToRead',
  updateTextReaded: 'updateTextReaded',
  updateInterimText: 'updateInterimText'
};

export const _updateTextToRead = createAction(textActionTypes.updateTextToRead);
export const updateTextReaded = createAction(textActionTypes.updateTextReaded);
export const updateInterimText = createAction(textActionTypes.updateInterimText);

export function updateTextToRead(text) {
  return function (dispatch, getState) {
    window.localStorage.setItem('textToRead', text);
    dispatch(_updateTextToRead(text));
  }
}
