import App from '../../components/app';
import { render } from '../test-utils';

const defaultProps = {
  classes: {},
  textReaded: 'The cat is',
  textToRead: 'The cat is under the table',
  interimText: 'The cat is under',
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
  displayTextReadedBox: false,
  talking: true,
  toggleDisplayTextReadedBox: () => {},
  onUpdateTextToRead: () => {},
  onUpdateTextReaded: () => {},
  onUpdateInterimText: () => {},
  onUpdateLang: () => {},
  onUpdateTalking: () => {},
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

  //TODO
  it('Should call onUpdateTalking when stop talking');
  it('Should call onInterimTextReadedChange when add some text into interim text box');
  it('Should call onUpdateTextReaded when add some text into readed text box');
  it('Should erase the texts when the reset button is pushed');
  it('Should update the text properly when the receive final transcriptions');
  it('Should update the text properly when the receive temporal transcriptions');
});