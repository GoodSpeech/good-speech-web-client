const udhr = require('udhr');
const find = require('lodash/find');

const fgRed = "\x1b[31m";
const minArticle = 0;
const maxArticle = 9;
const langMapCodes = {
  'az-AZ': 'az-Latn',
  'cmn-Hans-HK': 'zh-Hans',
  'cmn-Hans-CN': 'zh-Hant',
  'de-DE': 'de-1996',
  'ms-MY': 'ms-Latn',
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  'sr-RS': 'sr-Cyrl',
  'el-GR': 'el-monoton',
  'tr-TR': 'tk-Latn',
  'vi-VN': 'vi-Hani'
}
/**
 Do not remove these which may be useful in case there were some error with the ones above
 The above obj is generated for some special cases
 key: https://cloud.google.com/speech/docs/languages
 value: https://github.com/wooorm/udhr/blob/master/data/information.json (the key lang)

  '': 'tw-akuapem',
  '': 'tw-asante',
  '': 'bs-Cyrl',
  '': 'bs-Latn',
  '': 'el-polyton',
  '': 'ha-NE',
  '': 'ha-NG',
  '': 'mn-Cyrl',
  '': 'mn-Mong',
  '': 'kkh-Lana',
  '': 'ms-Arab',
  '': 'fa-AF',
  '': 'rm-puter',
  '': 'rm-rumgr',
  '': 'rm-surmiran',
  '': 'rm-sursilv',
  '': 'rm-sutsilv',
  '': 'rm-vallader',
  '': 'tl-Tglg',
  '': 'tk-Cyrl',
  '': 'ug-Arab',
  '': 'ug-Latn',
  '': 'uzn-Cyrl',
  '': 'uzn-Latn',
*/


function cleanLang(lang) {
  return langMapCodes[lang] || lang.split('-')[0]
}

function getArticlesAndPreamble(lang) {
  const json = udhr.json();
  const langPrefix = cleanLang(lang)
  const declaration = find(json, {lang: langPrefix});
  if (!declaration) {
    return [];
  }
  const preamble = declaration.preamble.para;
  const articles = declaration.article.slice(minArticle, maxArticle).map(article => article.para);
  return [...articles, preamble];
}

/**
 * Gathers every texts for a given language in here.
 *
 * @param  {str} lang
 * @return {list}
 */
function getTexts(lang) {
  process.stdout.write(`[GENERATION] Language: ${lang}\n`);
  const texts = getArticlesAndPreamble(lang);
  texts.sort((a, b)=> {return a.length - b.length});  // Sorth from shortest to longest, useful for mobile (get first if mobile)
  let color = ''
  if (texts.length === 0) {
    color = fgRed
  }
  process.stdout.write(`${color}[GENERATION] Texts found: ${texts.length}\x1b[0m\n`);
  return texts;
}

module.exports = getTexts;
