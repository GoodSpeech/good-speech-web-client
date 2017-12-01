import {
  pause,
  resume,
  cancel,
  speak
} from '../../services/text-to-speech';

describe('Text to speech', () => {
  describe('pause', () => {
    it('should call pause method', () => {
      window.speechSynthesis = {
        pause: jest.fn()
      };
      pause();
      expect(window.speechSynthesis.pause.mock.calls.length).toBe(1);
    });
  });

  describe('resume', () => {
    it('should call resume method', () => {
      window.speechSynthesis = {
        resume: jest.fn()
      };
      resume();
      expect(window.speechSynthesis.resume.mock.calls.length).toBe(1);
    });
  });

  describe('cancel', () => {
    it('should call cancel method', () => {
      window.speechSynthesis = {
        cancel: jest.fn()
      };
      cancel();
      expect(window.speechSynthesis.cancel.mock.calls.length).toBe(1);
    });
  });

  describe('speak', () => {
    it('should call speak method', () => {
      window.speechSynthesis = {
        cancel: jest.fn(),
        speak: jest.fn(),
      };
      window.SpeechSynthesisUtterance = function() {};
      speak('hello world', 'es-AR');
      expect(window.speechSynthesis.cancel.mock.calls.length).toBe(1);
      expect(window.speechSynthesis.speak.mock.calls).toMatchSnapshot();
    });
  });

});