import LanguagePicker from '../../components/language-picker';
import { render } from '../test-utils';

const defaultProps = {
  lang: {
    name: 'Spanish',
    code: 'es-AR'
  },
  onChange: () => {}
}

describe('LanguagePicker component', () => {
  beforeEach(() => {
    document.body.innerHtml = '';
  });

  it('Should render default settings', () => {
    const component = render(LanguagePicker, defaultProps);
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should call onChange function when select a language', () => {
    const onChange = jest.fn();
    const component = render(LanguagePicker, defaultProps, {onChange});
    let languagePicker = component.toJSON();

    //Clicking languages button
    languagePicker.children[0].props.onClick({currentTarget: document.body});

    //Language list was open
    expect(document.querySelector('#pick-language')).toBeTruthy();

    //Checks and clicks a language button
    const langButton = document.querySelector('[role="menuitem"]');
    expect(langButton.textContent).toEqual('Afrikaans (Suid-Afrika)');
    langButton.click();

    expect(onChange).toBeCalledWith({
      code: 'af-ZA',
      englishName: 'Afrikaans (South Africa)',
      name: 'Afrikaans (Suid-Afrika)'
    });
  });

});