import sample from 'lodash/sample';

import defaultTexts from '../i18n/content';

function getRandomText(lang, isMobile=false) {
    const texts = defaultTexts[lang];
    if (!texts || texts.length === 0) {
        return '';
    }
    if (isMobile) {
        return texts[0];
    }
    return sample(texts);
}

export default getRandomText;
