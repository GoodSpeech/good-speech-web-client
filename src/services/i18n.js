/**
 * Translation handler. This is a modified version of:
 * https://jaysoo.ca/2014/03/20/i18n-with-es2015-template-literals/
 */
import translations from '../i18n/translations';

// Matches optional type annotations in i18n strings.
// e.g. i18n`This is a number ${x}:n(2)` formats x as number
//      with two fractional digits.
const typeInfoRegex = /^:([a-z])(\((.+)\))?/;
const config = {
  locale: 'en',
  messageBundle: {},
  _localizers: {
    s /*string*/: v => v.toLocaleString(config.locale),
    n /*number*/: (v, fractionalDigits) => (
      v.toLocaleString(config.locale, {
        minimumFractionDigits: fractionalDigits,
        maximumFractionDigits: fractionalDigits
      })
    )
  }
};

function use(locale) {
  config.locale = locale;
  config.messageBundle = {};
  if (locale in translations) {
    config.messageBundle = translations[locale];
  }
}

function translate(strings, ...values) {
  let translationKey = _buildKey(strings);
  let translationString = config.messageBundle[translationKey] || translationKey;
  let typeInfoForValues = strings.slice(1).map(_extractTypeInfo);
  let localizedValues = values.map((v, i) => _localize(v, typeInfoForValues[i]));

  return _buildMessage(translationString, ...localizedValues);
}

function _extractTypeInfo(str) {
  let match = typeInfoRegex.exec(str);
  if (match) {
    return {type: match[1], options: match[3]};
  } else {
    return {type: 's', options: ''};
  }
}

function _localize(value, {type, options}) {
  return config._localizers[type](value, options);
}

// e.g. _buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'
function _buildKey(strings) {
  let stripType = s => s.replace(typeInfoRegex, '');
  let lastPartialKey = stripType(strings[strings.length - 1]);
  let prependPartialKey = (memo, curr, i) => `${stripType(curr)}{${i}}${memo}`;

  return strings.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
}

// e.g. _buildMessage('{0} {1}!', 'hello', 'world') == 'hello world!'
function _buildMessage(str, ...values) {
  return str.replace(/{(\d)}/g, (_, index) => values[Number(index)]);
}


export {translate as i18n, use as useLocale}
