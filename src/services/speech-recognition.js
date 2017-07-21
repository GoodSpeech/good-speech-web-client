import _ from 'lodash';
import hark from 'hark';
import log from 'loglevel';

let speechRecognizer;
let waitingForResultTimeout;
let waitingForActivityTimeout;
let audioStream;
let audioStreamSpeechEvents;
let speaking;

let stopped = false;

const defaultConfig = {
  onRestarting: () => {},
  onRecording: () => {},
  onSpeech: () => {},
  onError: () => {},
  onStart: () => {},
  onStop: () => {},
  lang: 'en-US',
  continuous: true,
  interimResults: true,
  maxAlternatives: 10
};

let currentConfig = defaultConfig;

function clearAllTimeouts() {
  clearTimeout(waitingForResultTimeout);
  clearTimeout(waitingForActivityTimeout);
}

function abortSpeechRecognizer() {
  clearAllTimeouts();
  speechRecognizer.abort();
  log.info('abortSpeechRecognizer');
  currentConfig.onStop();
}

function stopSpeechRecognizer() {
  clearAllTimeouts();
  speechRecognizer.stop();
  log.info('stopSpeechRecognizer');
  currentConfig.onStop();
}

function delayedStartSpeechRecognizer() {
  try {
    _.defer(startSpeechRecognizer);
  } catch (error) {
    delayedStartSpeechRecognizer();
  }
}


function stopSpeakRecognizer() {
  audioStream.getTracks().forEach(track => track.stop());
  audioStreamSpeechEvents.stop();
}

function handleOnEnd() {
  log.info('handleOnEnd');
  clearAllTimeouts();
  currentConfig.onStop();
  log.info('handleOnEnd', 'restarting');
  if (!stopped) {
    currentConfig.onRestarting();
    delayedStartSpeechRecognizer();
  }
}

function handleOnStart() {
  log.info('handleOnStart');
  currentConfig.onRecording();
}

function handleResult(result) {
  if (!result || !result.results) {
    return;
  }

  const recognition = result.results[result.resultIndex];
  const text = _.map(recognition, text => ({
    confidence: text.confidence,
    text: text.transcript
  }));
  log.info('handleResult');
  currentConfig.onSpeech({
    final: recognition.isFinal,
    text
  });
  updateHandleResultTimeout(text, recognition.isFinal);
}

function updateHandleResultTimeout(text, isFinal) {
  clearTimeout(waitingForResultTimeout);
  if (!isFinal) {
    waitingForResultTimeout = setTimeout(() => {
      log.error('result timeout');
      currentConfig.onSpeech({
        final: true,
        text
      });
      abortSpeechRecognizer();
    }, 2000);
  }
}

function handleError(event) {
  log.info('handleError', event.error);
  currentConfig.onError();
}

function handleWaitingForActivityTimeout() {
  if (!speaking) {
    abortSpeechRecognizer();
  }
}

function handleAudioStream(stream) {
  audioStream = stream;
  audioStreamSpeechEvents = hark(audioStream, {
    interval: 200
  });
  audioStreamSpeechEvents.on('speaking', () => {
    speaking = true;
    log.info('speaking');
  });
  audioStreamSpeechEvents.on('stopped_speaking', () => {
    speaking = false;
    clearTimeout(waitingForActivityTimeout);
    waitingForActivityTimeout = setTimeout(handleWaitingForActivityTimeout, 5000);
    log.info('stopped_speaking');
  });
}

function startSpeakRecognizer() {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false
    })
    .then(handleAudioStream)
    .catch(err => log.error(err));
}

function startSpeechRecognizer() {
  log.info('startSpeechRecognizer');
  currentConfig.onStart();
  try {
    speechRecognizer.start();
  } catch (err) {
    log.error(err);
  }
}

function initSpeechRecognition({lang, continuous, interimResults, maxAlternatives}) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = continuous;
    speechRecognizer.lang = lang;
    speechRecognizer.interimResults = interimResults;
    speechRecognizer.maxAlternatives = maxAlternatives;

    speechRecognizer.onstart = handleOnStart;
    speechRecognizer.onresult = handleResult;
    speechRecognizer.onerror = handleError;
    speechRecognizer.onend = handleOnEnd;  
  }
}

function init(config) {
  const updatedConfig = {
    ...defaultConfig,
    ...config
  };
  currentConfig = updatedConfig;
  initSpeechRecognition(updatedConfig);
}

function start() {
  stopped = false;
  startSpeakRecognizer();
  startSpeechRecognizer();
}

function stop() {
  stopped = true;
  clearAllTimeouts();
  stopSpeakRecognizer();
  stopSpeechRecognizer();
}

export default {
  init,
  start,
  stop
};
