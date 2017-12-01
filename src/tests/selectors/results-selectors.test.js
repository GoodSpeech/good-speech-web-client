import {
  textReadedFeedbackSelector,
  scoreSelector
} from '../../selectors/results-selectors';

describe('Results Selector', () => {
  it('should compute the text differences', () => {
    expect(textReadedFeedbackSelector({
      texts: {
        textToRead: 'foo',
        textReaded: 'bar'
      }
    })).toEqual([{
      position: 0,
      similarity: 0, 
      value: 'foo'
    }]);
  });

  it('should provide a score', () => {
    expect(scoreSelector({
      texts: {
        textToRead: 'foo',
        textReaded: 'bar'
      }
    })).toEqual(0);
  });
});
