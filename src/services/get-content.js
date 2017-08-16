import sample from 'lodash/sample';

import defaultTexts from '../i18n/content';


function getRandomText(lang, isMobile=false) {
    lang = lang.split('-')[0];
    const texts = defaultTexts[lang];
    if (texts.length === 0) {
        return '';
    }
    if (isMobile) {
        return texts[0];
    }
    return sample(texts);
}

export default getRandomText;
