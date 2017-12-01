import {
  textActionTypes,
  updateTextReaded,
  updateInterimText,
  updateTextToRead,
} from '../../actions/texts-actions'

describe('TextsActions', () => {
  it('should create an action to update the readed text', () => {
    const expectedAction = {
      type: textActionTypes.updateTextReaded,
      payload: 'foo'
    }
    expect(updateTextReaded('foo')).toEqual(expectedAction)
  });

  it('should create an action to update the interim text', () => {
    const expectedAction = {
      type: textActionTypes.updateInterimText,
      payload: 'foo'
    }
    expect(updateInterimText('foo')).toEqual(expectedAction)
  });

  describe('updateTextToRead action', () => {
    let dispatch;
    let getState;

    const localStorage = window.localStorage;
    let calledActions = [];

    beforeEach(() => {
      window.localStorage = {
        setItem: jest.fn(),
        getItem: jest.fn()
      };
      dispatch = (action) => {
        if (action instanceof Function) {
          action(dispatch, getState)
        }
        calledActions.push(action);
      };
      getState = () => {};
    });

    afterEach(() => {
      window.localStorage = localStorage;
      calledActions = [];
    });

    it('should store the text to read into the local storage', () => {
      updateTextToRead('foo')(dispatch, getState);
      expect(window.localStorage.setItem.mock.calls[0]).toEqual(['textToRead', 'foo']);
    });

    it('should update text to read', () => {
      updateTextToRead('foo')(dispatch, getState);
      expect(calledActions.find(action => action.type === 'updateTextToRead')).toEqual({
        type: 'updateTextToRead',
        payload: 'foo'
      });
    });
  });
})