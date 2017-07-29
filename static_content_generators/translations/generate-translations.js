/**
 * This script is not intended to be run on the browser.
 */
const translate = require('google-translate-api');
const extend = require('lodash/extend');
const langs = require('google-translate-api/languages');
const fs = require('fs');

function getLangs() {
  let _langs = JSON.parse(JSON.stringify(langs));

  delete _langs['auto'];
  delete _langs['isSupported'];
  delete _langs['getCode'];
  delete _langs['en'];
  return _langs;
}

function getTotalTranslations(langs, keysToTranslate) {
  return Object.keys(langs).length * keysToTranslate.length;
}

function save(obj) {
  process.stdout.write('[SAVE] Saving to disk...\n');

  const stringyObj = JSON.stringify(obj, null, 2)
  const stringToSave = `const translations = ${stringyObj};\nexport default translations;\n`
  fs.writeFile("./translations.js", stringToSave, function(err) {
    if(err) {
        return process.stderr.write('[SAVE][ERROR] Something happened...\n', err);
    }

    process.stdout.write('[SAVE] Done!\n');
  });
}

function printProgress(progress){
  const tmpl = `[TRANSLATION] Completed: ${progress}%`;
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(tmpl);
}

function generateTranslations(keysToTranslate, knowTranslations) {
  process.stdout.write('[TRANSLATION] Starting... Please wait, it may take a while.\n');

  const langs = getLangs();
  const totalTranslations = getTotalTranslations(langs, keysToTranslate);
  let translations = {};
  let countTranslations = 0;

  process.stdout.write(`[TRANSLATION] Total translations to generate: ${totalTranslations}\n`);

  for (let toLang in langs) {
    translations[toLang]= {};
    keysToTranslate.forEach((key, index) => {
      translate(key, {from: 'en', to: toLang}).then(res => {
        translations[toLang][key] = res.text;
        countTranslations += 1;

        if (countTranslations % 10 === 0) {
          printProgress(parseInt(countTranslations / totalTranslations * 100, 10));
        }
        if (countTranslations === totalTranslations) {
          process.stdout.write('\n[TRANSLATION] Done.\n');
          for (let langKey in knowTranslations) {
            translations[langKey] = translations[langKey] || {};
            extend(translations[langKey], knowTranslations[langKey]);
          }
          save(translations)
        }
      }).catch(err => {
        process.stderr.write('[TRANSLATION][ERROR] Something happened...\n', err);
      });
    });
  }
}
module.exports = generateTranslations;