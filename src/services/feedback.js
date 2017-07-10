import { diffWords } from 'diff';
import _ from 'lodash';
import log from 'loglevel';
import { compareTwoTexts } from 'text-sound-similarity';
import words from 'voca/words';


function cleanText(text) {
  return words(text.toLowerCase()).join(' ');
}


/**
 * Make an array that aggregates elements from each of the arrays.
 *
 * @param  {[array]} arr  [1, 2]
 * @param  {[array]} arrr [3, 4]
 * @return {[array]}      [[1, 3] [2, 4]]
 */
function zip(arr, arrr) {
  return arr.map((e, i) => {
    return [e, arrr[i]];
  });
}


function categorizeAndSequenceDiff(diffed){
  return diffed.reduce((result, part, index) => {
    const [unchanged, added, removed] = result;
    const item = {
      value: part.value,
      position: index
    };

    // The diff library is poorly designed so this check is necessary
    if (!_.has(part, 'added') && !_.has(part, 'removed')) {
      unchanged.push(item);
    } else if (part.added) {
      added.push(item);
    } else if (part.removed) {
      removed.push(item);
    }
    return result;
  }, [[], [], []]);
}


function getSimilarity(pairs) {
  return pairs.map((item) => {
    let firstWord = item[0].value,
      secondWord = item[1].value;
    let similarity = compareTwoTexts(firstWord, secondWord);
    log.info(`similarity(${firstWord}, ${secondWord}) = ${similarity}`);
    return [item, similarity];
  });
}


/**
 * Returns value from the text to read
 *
 * @param  {array} items
 * @return {collection}
 */
function serializeSimilarityArray(items) {
  return items.map((item) => {
    let textToReadItem = item[0][1];
    return {
      value: textToReadItem.value,
      position: textToReadItem.position,
      similarity: item[1],
      __backup: item
    }
  });
}


/**
 * @param  {string} original
 * @param  {string} readed
 * @return {collection}
 */
function compute(original, readed) {
  let diff, unchanged, added, removed, similarity, merged, serializedSimilarity, sortByPosition;

  original = cleanText(original);
  readed = cleanText(readed);
  diff = diffWords(original, readed);
  [unchanged, added, removed] = categorizeAndSequenceDiff(diff);
  similarity = getSimilarity(zip(added, removed));
  serializedSimilarity = serializeSimilarityArray(similarity);
  merged = _.concat(unchanged, serializedSimilarity)
  sortByPosition = _.sortBy(merged, ['position']);

  return sortByPosition;
}

export default {
  compute
};