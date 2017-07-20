import log from 'loglevel';

const speechSynthesis = window.speechSynthesis;
const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance

function pause() {
  speechSynthesis.pause();
}

function resume() {
  speechSynthesis.resume();
}

function cancel() {
  speechSynthesis.cancel();
}

/**
 * @param  {string} text - Must have at least one word.
 * @return {string} Speech result
 */
function speak(text, langCode='en-US') {
  cancel();
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = langCode;
  msg.voiceURI = 'native';
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 1;

  msg.onstart = (evt) => {
    log.info('Speaking...', text);
  };
  msg.onend = (evt) => {
    log.info(`Finised in ${evt.elapsedTime} seconds.`);
  };
  msg.onerror = (evt) => {
    log.error(evt);
  };
  speechSynthesis.speak(msg);
}

export default {
  speak,
  pause,
  cancel,
  resume
};