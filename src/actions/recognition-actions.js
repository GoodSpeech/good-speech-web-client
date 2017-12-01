import { createAction } from 'redux-actions';

export const recognitionActionTypes = {
  updateTalking: 'updateTalking'
};

export const updateTalking = createAction(recognitionActionTypes.updateTalking);
