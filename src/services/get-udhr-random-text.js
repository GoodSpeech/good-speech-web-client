import udhr from 'udhr';
import _ from 'lodash';

const minArticle = 0;
const maxArticle = 9;
const langMapCodes = {
  'cmn-Hans': 'zh-Hans',
  'cmn-Hant': 'zh-Hant',
  'pt': null,
  'de': 'de-1996'
}

function cleanLang(lang) {
  const langCode = Object.keys(langMapCodes).find(langCode => lang.startsWith(langCode))
  if (!langCode) {
    return lang.split('-')[0]
  }

  return langMapCodes[langCode] || lang;
}

function getArticlesAndPreamble(lang) {
  const json = udhr.json();
  const langPrefix = cleanLang(lang)
  const declaration = _.find(json, {lang: langPrefix});
  const preamble = declaration.preamble.para;
  const articles = declaration.article.slice(minArticle, maxArticle).map(article => article.para);
  return [...articles, preamble];
}

function getRandomText(lang) {
  const elements = getArticlesAndPreamble(lang);
  return _.sample(elements);
}

export default getRandomText;