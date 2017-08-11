const udhr = require('udhr');
const find = require('lodash/find');


const minArticle = 0;
const maxArticle = 9;
const langMapCodes = {
  'zh-cn': 'zh-Hans',
  'zh-tw': 'zh-Hant',
  'pt': 'pt-BR',
  'de': 'de-1996'
}

function cleanLang(lang) {
  const langCode = Object.keys(langMapCodes).find(langCode => lang.startsWith(langCode))
  return langMapCodes[langCode] || lang;
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
  process.stdout.write(`[GENERATION] Texts found: ${texts.length}\n`);
  return texts;
}

module.exports = getTexts;
