import getRandomText from '../../services/get-content';
import defaultTexts from '../../i18n/content';

describe('Get Content', () => {
  it('Should return some text', () => {
    expect(defaultTexts['af-ZA']).toContain(getRandomText('af-ZA'));
  });

  it('Should return the first text', () => {
    expect(getRandomText('af-ZA', true)).toBe(defaultTexts['af-ZA'][0]);
  });

  it('Should return empty text', () => {
    expect(getRandomText('fooBar')).toBe('');
  });
});