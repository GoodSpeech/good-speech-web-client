const getTexts = require('./get-texts');
const supportedLanguages = require('../../src/i18n/langs');
const fs = require('fs');

function getLangs(langs) {
  return langs.map(l => l.code);
}

function save(obj) {
  process.stdout.write('[SAVE] Saving to disk...\n');

  const stringyObj = JSON.stringify(obj, null, 2);
  const stringToSave = `const defaultTexts = ${stringyObj};\nexport default defaultTexts;\n`
  fs.writeFile("./content.js", stringToSave, function(err) {
    if(err) {
        return process.stderr.write('[SAVE][ERROR] Something happened...\n', err);
    }

    process.stdout.write('[SAVE] Done!\n');
  });
}

function generateTexts() {
    process.stdout.write('[GENERATION] Starting...!\n');
    const langCodes = getLangs(supportedLanguages);
    const texts = langCodes.reduce((acc, code) => {
        acc[code] = getTexts(code);
        return acc;
    }, {});
    process.stdout.write('[GENERATION] Done!\n');
    save(texts);
}

module.exports = generateTexts;
