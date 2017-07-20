import _ from 'lodash';
import log from 'loglevel';
import words from 'voca/words';


const MAX_WORDS_LENGTH = 29;
const SENTENCE_REGEX = /[^.!,?]*[.!,?]*/g;


let SpeechSynthesis = ((speechSynthesis) => {

    function getSentences(text) {
        text = text.replace(/\n/g, '');
        let wordsLength = words(text).length;

        if (wordsLength >= MAX_WORDS_LENGTH) {
            log.info(`Phrase longer than ${MAX_WORDS_LENGTH} words, creating sentences...`);
            let sentences = text.match(SENTENCE_REGEX);
            return sentences;
        }
        return [text]
    }

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
        if (!_.isString(text)) {
            let textType = typeof text;
            log.error(`Expected string, instead received ${textType}`);
            return;
        }
        cancel();

        let sentences = getSentences(text);
        sentences.forEach((sentence) => {
            let msg = new window.SpeechSynthesisUtterance(sentence);
            msg.lang = langCode;
            msg.voiceURI = 'native';
            msg.volume = 1;
            msg.rate = 1.15;
            msg.pitch = 0.7;
            msg.onstart = (evt) => {
                log.info('Speaking...', sentence);
            };
            msg.onend = (evt) => {
                log.info(`Finised in ${evt.elapsedTime} seconds.`);
            };
            msg.onerror = (evt) => {
                log.error(evt);
            };

            speechSynthesis.speak(msg);
        });
    }

    return {
        speak,
        pause,
        cancel,
        resume
    };

})(window.speechSynthesis);

export default SpeechSynthesis;