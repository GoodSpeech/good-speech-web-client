import { createStore } from 'redux';
import reducer from '../../reducers/texts-reducer';
import {
  _updateTextToRead,
  updateTextReaded,
  updateInterimText,
} from '../../actions/texts-actions';

describe('Texts Reducers', () => {
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

  it('should update the text to read properly', () => {
    expect(store.getState().textToRead).toEqual('');
    store.dispatch(_updateTextToRead('foo'));
    expect(store.getState().textToRead).toEqual('foo');
  });

  it('should update the text readed properly', () => {
    expect(store.getState().textReaded).toEqual('');
    store.dispatch(updateTextReaded('foo'));
    expect(store.getState().textReaded).toEqual('foo');
  });

  it('should update the interim text properly', () => {
    expect(store.getState().interimText).toEqual('');
    store.dispatch(updateInterimText('foo'));
    expect(store.getState().interimText).toEqual('foo');
  });
  
})