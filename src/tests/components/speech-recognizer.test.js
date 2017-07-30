import SpeechRecognizer from '../../components/speech-recognizer';
import { render, renderInContainer } from '../test-utils';

const defaultProps = {
  onSpeech: () => {},
  langCode: 'es-AR',
  onReset: () => {},
  onStartTalking: () => {},
  onStopTalking: () => {},
  talking: false,
  displayResetButton: false,
  speechRecognitionSupported: true,
  speechRecognition: {
    init: () => {},
    start: () => {},
    stop: () => {}
  }
};

describe('SpeechRecognizer component', () => {
  it('Should display unsupported message', () => {
    const component = render(SpeechRecognizer, defaultProps, {speechRecognitionSupported: false});
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should open google chrome website when click unsupported message button', () => {
    const component = render(SpeechRecognizer, defaultProps, {speechRecognitionSupported: false});
    const button = component.toJSON().children[0];

    const focus = jest.fn();
    window.open = jest.fn();
    window.open.mockReturnValue({focus});

    button.props.onClick();
    expect(window.open).toBeCalledWith('https://www.google.com/chrome/index.html', '_blank');
    expect(focus).toBeCalled();
  });

  it('Should display Stop reading button', () => {
    const component = render(SpeechRecognizer, defaultProps, { talking: true });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should call onStopTalking and speechRecognition.stop functions when click Stop reading button', () => {
    const onStopTalking = jest.fn();
    const onStopSpeechRecognition = jest.fn();
    const component = render(SpeechRecognizer, defaultProps, {
      talking: true,
      onStopTalking,
      speechRecognition: {
        ...defaultProps.speechRecognition,
        stop: onStopSpeechRecognition
      }
    });
    const button = component.toJSON().children[0];
    button.props.onClick();
    expect(onStopTalking).toBeCalled();
    expect(onStopSpeechRecognition).toBeCalled();
  });

  it('Should display Reset and Continue reading button', () => {
    const component = render(SpeechRecognizer, defaultProps, { displayResetButton: true });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should call onStartTalking and speechRecognition.start functions when click Continue reading button', () => {
    const onStartTalking = jest.fn();
    const onStartSpeechRecognition = jest.fn();
    const component = render(SpeechRecognizer, defaultProps, {
      displayResetButton: true,
      onStartTalking,
      speechRecognition: {
        ...defaultProps.speechRecognition,
        start: onStartSpeechRecognition
      }
    });
    const button = component.toJSON().children[1];
    button.props.onClick();
    expect(onStartTalking).toBeCalled();
    expect(onStartSpeechRecognition).toBeCalled();
  });

  it('Should call onReset function when click Reset button', () => {
    const onReset = jest.fn();
    const component = render(SpeechRecognizer, defaultProps, {
      displayResetButton: true,
      onReset
    });
    const button = component.toJSON().children[0];
    button.props.onClick();
    expect(onReset).toBeCalled();
  });

  it('Should display Start reading button', () => {
    const component = render(SpeechRecognizer, defaultProps);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should call onStartTalking and speechRecognition.start functions when click Start reading button', () => {
    const onStartTalking = jest.fn();
    const onStartSpeechRecognition = jest.fn();
    const component = render(SpeechRecognizer, defaultProps, {
      onStartTalking,
      speechRecognition: {
        ...defaultProps.speechRecognition,
        start: onStartSpeechRecognition
      }
    });
    const button = component.toJSON().children[0];
    button.props.onClick();
    expect(onStartTalking).toBeCalled();
    expect(onStartSpeechRecognition).toBeCalled();
  });

  it('Should call speechRecognition.init function', () => {
    const init = jest.fn();
    render(SpeechRecognizer, defaultProps, {
      speechRecognition: {
        ...defaultProps.speechRecognition,
        init
      }
    });
    const initConfig = init.mock.calls[0][0];
    expect(initConfig.interimResults).toEqual(true);
    expect(initConfig.lang).toEqual(defaultProps.langCode);
    expect(typeof initConfig.onSpeech).toEqual('function');
  });

  it('Should call onSpeech function when speechRecognition returns some text', () => {
    const onSpeech = jest.fn();
    let speechComponentHandler;
    render(SpeechRecognizer, defaultProps, {
      onSpeech,
      speechRecognition: {
        ...defaultProps.speechRecognition,
        init: (config) => {
          speechComponentHandler = config.onSpeech
        }
      }
    });
    speechComponentHandler('some text');
    expect(onSpeech).toBeCalledWith('some text');
  });

  it('Should call speechRecognition.init function when change lang code', () => {
    const container = document.createElement('div');
    renderInContainer(SpeechRecognizer, container, defaultProps);

    const init = jest.fn();
    renderInContainer(SpeechRecognizer, container, defaultProps, {
      ...defaultProps,
      langCode: 'en-US',
      speechRecognition: {
        ...defaultProps.speechRecognition,
        init
      }
    });

    const initConfig = init.mock.calls[0][0];
    expect(initConfig.interimResults).toEqual(true);
    expect(initConfig.lang).toEqual('en-US');
    expect(typeof initConfig.onSpeech).toEqual('function');
  });
});