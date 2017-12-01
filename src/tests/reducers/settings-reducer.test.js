import { createStore } from 'redux';
import reducer from '../../reducers/settings-reducer';
import {
  _updateLang,
  _toggleDisplayTextReadedBox
} from '../../actions/settings-actions';

describe('Settings Reducers', () => {
  const localStorage = window.localStorage;
  let store;

  beforeEach(() => {
    store = createStore(reducer);
    window.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn()
    };
  });

  afterEach(() => {
    window.localStorage = localStorage;
  });

  it('should update the lang status properly', () => {
    expect(store.getState().lang).toEqual({
      code: 'en-US',
      englishName: 'English (United States)',
      name: 'English (United States)'
    });
    store.dispatch(_updateLang({
      code: 'es-AR',
      englishName: 'Spanish',
      name: 'Español'
    }));
    expect(store.getState().lang).toEqual({
      code: 'es-AR',
      englishName: 'Spanish',
      name: 'Español'
    });
  });

  it('should update the display text visibility properly', () => {
    expect(store.getState().displayTextReadedBox).toBe(false);
    store.dispatch(_toggleDisplayTextReadedBox(true));
    expect(store.getState().displayTextReadedBox).toBe(true);
  });
})