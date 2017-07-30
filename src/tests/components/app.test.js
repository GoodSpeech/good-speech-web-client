import App from '../../components/app';
import { render } from '../test-utils';

const defaultProps = {
  textReaded: 'The cat is',
  textToRead: 'The cat is under the table',
  lang:  {
    name: 'Español (Argentina)',
    code: 'es-AR',
    englishName: 'Spanish (Argentina)'
  },
  score: 70,
  textReadedFeedback: [{
    value: 'The cat is',
    similarity: 0.7
  }],
  talking: true
};

window.localStorage = {
  getItem: () => {},
  setItem: () => {}
};

describe('TextSpeak component', () => {
  it('Should display default state', () => {  
    const component = render(App, defaultProps);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should display score', () => {  
    const component = render(App, defaultProps, {
      talking: false
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should display text read box', () => {
    const component = render(App, defaultProps, {
      displayTextReadedBox: true
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});