import {
  recognitionActionTypes,
  updateTalking
} from '../../actions/recognition-actions'

describe('RecognitionActions', () => {
  it('should create an action to update the talking status', () => {
    const status = true
    const expectedAction = {
      type: recognitionActionTypes.updateTalking,
      payload: status
    }
    expect(updateTalking(true)).toEqual(expectedAction)
  })
})