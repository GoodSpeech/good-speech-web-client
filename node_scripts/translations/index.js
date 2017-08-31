const knowTranslations = require('./known-translations.json');
const keysToTranslate = require('./keys.json');
const generateTranslations = require('./generate-translations');

generateTranslations(keysToTranslate, knowTranslations);