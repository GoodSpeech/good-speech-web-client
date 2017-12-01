import log from 'loglevel';

export function pause() {
  window.speechSynthesis.pause();
}

export function resume() {
  window.speechSynthesis.resume();
}

export function cancel() {
  window.speechSynthesis.cancel();
}

/**
 * @param  {string} text - Must have at least one word.
 * @return {string} Speech result
 */
export function speak(text, langCode='en-US') {
  cancel();
  const msg = new window.SpeechSynthesisUtterance();
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
  window.speechSynthesis.speak(msg);
}