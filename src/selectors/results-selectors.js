import * as Feedback from '../services/feedback';
import { createSelector } from 'reselect';

const textReadedSelector = state => state.texts.textReaded;
const textToReadSelector = state => state.texts.textToRead;

export const textReadedFeedbackSelector = createSelector(
  textReadedSelector,
  textToReadSelector,
  (textReaded, textToRead) => {
    if (textReaded && textToRead) {
      return Feedback.compute(textToRead, textReaded);
    }
    return [];
  }
);

export const scoreSelector = createSelector(
  textReadedFeedbackSelector,
  (textReadedFeedback) => Feedback.getScore(textReadedFeedback)
);
