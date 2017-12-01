import * as SpeechRecognition from '../../services/speech-recognition';

describe('SpeechRecognition', () => {
  const tmpSpeechRecognition = window.SpeechRecognition;
  const startMock = jest.fn();
  const stopMock = jest.fn();

  beforeEach(() => {
    window.SpeechRecognition = function() {
      this.start = startMock;
      this.stop = stopMock;
    };
  });

  afterEach(() => {
    window.SpeechRecognition = tmpSpeechRecognition;
  });

  describe('Init', () => {
    it('should initialize the SpeechRecognition service properly', () => {
      expect(SpeechRecognition.init({})).toMatchSnapshot();
    });
  });

  describe('Start', () => {
    it('should start the SpeechRecognition service properly', () => {
      const onStart = jest.fn();
      SpeechRecognition.init({onStart});
      SpeechRecognition.start();
      expect(startMock.mock.calls.length).toBe(1);
      expect(onStart.mock.calls.length).toBe(1);
    });
  });

  describe('Stop', () => {
    it('should stop the SpeechRecognition service properly', () => {
      const onStop = jest.fn();
      SpeechRecognition.init({
        onStart: () => {},
        onStop
      });
      SpeechRecognition.start();
      SpeechRecognition.stop();
      expect(stopMock.mock.calls.length).toBe(1);
      expect(onStop.mock.calls.length).toBe(1);
    });
  });
});