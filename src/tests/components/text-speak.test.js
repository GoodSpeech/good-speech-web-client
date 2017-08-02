import TextSpeak from '../../components/text-speak';
import { render } from '../test-utils';

const defaultProps = {
  text: 'The cat, is under. The table; he said',
  style: {
    color: 'red'
  },
  lang: 'es-AR',
  speechSynthesis: {
    speak: () => {}
  },
  onHover: () => {}
};

describe('TextSpeak component', () => {
  it('Should display text sentences', () => {
    const component = render(TextSpeak, defaultProps);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should apply hover style when hover a sentence', () => {
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();
    const component = render(TextSpeak, defaultProps);
    const sentence = component.toJSON().children[0];
    
    sentence.props.onMouseEnter({stopPropagation, preventDefault});
    expect(component.toJSON()).toMatchSnapshot();
    sentence.props.onMouseLeave({stopPropagation, preventDefault});
    expect(component.toJSON()).toMatchSnapshot();

    expect(stopPropagation.mock.calls.length).toBe(2);
    expect(preventDefault.mock.calls.length).toBe(2);
  });

  it('Should apply hover style when hover a sentence', () => {
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();
    const component = render(TextSpeak, defaultProps);
    const sentence = component.toJSON().children[0];
    
    sentence.props.onMouseDown({stopPropagation, preventDefault});
    expect(component.toJSON()).toMatchSnapshot();

    expect(stopPropagation).toBeCalled();
    expect(preventDefault).toBeCalled();
  });

  it('Should call speechSynthesis.speak(text) when click a sentence', () => {
    const speak = jest.fn();
    const component = render(TextSpeak, defaultProps, {
      speechSynthesis: { speak }
    });
    const sentence = component.toJSON().children[0];
    
    sentence.props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    expect(speak).toBeCalledWith('The cat,', 'es-AR');
  });

});