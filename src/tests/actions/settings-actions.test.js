import {
  updateLang,
  toggleDisplayTextReadedBox
} from '../../actions/settings-actions';

describe('SettingsActions', () => {
  let dispatch;
  let getState;

  describe('updateLang action', () => {
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

    it('should store language code into the local storage', () => {
      updateLang({
        code: 'es-AR'
      })(dispatch, getState);
      expect(window.localStorage.setItem.mock.calls[0]).toEqual(['lang', 'es-AR']);
    });

    it('should update text to read', () => {
      updateLang({
        code: 'es-AR'
      })(dispatch, getState);
      expect(calledActions.find(action => action.type === 'updateTextReaded')).toBeTruthy();
    });

    it('should remove text readed', () => {
      updateLang({
        code: 'es-AR'
      })(dispatch, getState);
      const action = calledActions.find(action => action.type === 'updateTextReaded');
      expect(action.payload).toBe('');
    });

    it('should remove interim text', () => {
      updateLang({
        code: 'es-AR'
      })(dispatch, getState);
      const action = calledActions.find(action => action.type === 'updateInterimText');
      expect(action.payload).toBe('');
    });

    it('should update the language code', () => {
      updateLang({
        code: 'es-AR'
      })(dispatch, getState);
      const action = calledActions.find(action => action.type === 'updateLang');
      expect(action.payload).toEqual({
        code: 'es-AR'
      });
    });
  });

  describe('toggleDisplayTextReadedBox', () => {
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
      getState = () => ({
        settings: {
          displayTextReadedBox: false
        }
      });
    });

    afterEach(() => {
      window.localStorage = localStorage;
      calledActions = [];
    });

    it('should store the preference into the local storage', () => {
      toggleDisplayTextReadedBox()(dispatch, getState);
      expect(window.localStorage.setItem.mock.calls[0]).toEqual(['displayTextReadedBox', true]);
    });

    it('should update the toggleDisplayTextReadedBox flag', () => {
      toggleDisplayTextReadedBox()(dispatch, getState);
      const action = calledActions.find(action => action.type === 'toggleDisplayTextReadedBox');
      expect(action).toBeTruthy();
    });
  });
})