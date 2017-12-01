import {
  compute,
  getScore
} from '../../services/feedback';

describe('Feedback', () => {
  describe('compute', () => {
    it('should bring some results', () => {
      expect(compute('foo', 'bar')).toMatchSnapshot();
      expect(compute(
        'A similar approach can be taken when it comes to testing your React components.',
        'A similar dsf mar be taken when it dome to javi your React components. Instead')
      ).toMatchSnapshot();
    });
  });

  describe('getScore', () => {
    it('bring some score', () => {
      expect(getScore(compute('foo', 'foo'))).toBe(100);
      expect(getScore(compute('foo', 'bar'))).toBe(0);
      expect(getScore(compute(
        'A similar approach can be taken when it comes to, testing your React components. Something',
        'A similar dsf mar be taken when it dome to javi, your React components. Instead'))
      ).toBe(70);
    });
  });
});