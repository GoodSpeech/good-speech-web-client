import { createStore } from 'redux';
import reducer from '../../reducers/recognition-reducer';
import { updateTalking } from '../../actions/recognition-actions';

describe('Recognition Reducers', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('should update the talking status properly', () => {
    expect(store.getState().talking).toBe(false);
    store.dispatch(updateTalking(true));
    expect(store.getState().talking).toBe(true);
  })
})