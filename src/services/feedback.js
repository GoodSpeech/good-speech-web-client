import { diffWords } from 'diff';
import _ from 'lodash';
import log from 'loglevel';
import { compareTwoTexts } from 'text-sound-similarity';
import words from 'voca/words';


function cleanText(text) {
  return words(text.toLowerCase()).join(' ');
}

function isRemovedPart(part) {
  return part.removed;
}

function isAddedPart(part) {
  return part.added;
}

function isUnchangedPart(part) {
  return !isRemovedPart(part) && !isAddedPart(part);
}

function categorizeAndSequenceDiff(diffed){
  return diffed.reduce((result, part, index) => {
    const [unchanged, added, removed] = result;
    const item = {
      value: part.value,
      position: index
    };

    // The diff library is poorly designed so this check is necessary
    if (isUnchangedPart(part)) {
      unchanged.push({...item, similarity: 1});
    } else if (isAddedPart(part)) {
      added.push(item);
    } else if (isRemovedPart(part)) {
      removed.push(item);
    }
    return result;
  }, [[], [], []]);
}

function getAddedItemsWindow(addedItems, basePoint, size) {
  let start = Math.floor(addedItems.length * basePoint);
  if (start - 1 >= 0) {
    start = start - 1;
  }
  let end = start + size;
  if (end > addedItems.length) {
    end = addedItems.length;
  }
  return addedItems.slice(start, end);
}

function getSimilarity(removedItems, addedItems) {
  return removedItems.map((itemRemoved, index) => {
    const firstWord = cleanText(itemRemoved.value  || '');
    let similarity = 1;
    if (firstWord.length > 1) {
      similarity = getAddedItemsWindow(addedItems, index/removedItems.length, 3).reduce((similarity, itemAdded) => {
        const secondWord = cleanText(itemAdded.value || '');
        let newSimilarity = 0;
        if (secondWord.length >= 1) {
          newSimilarity = compareTwoTexts(firstWord, secondWord);
          log.info(`similarity(${firstWord}, ${secondWord}) = ${newSimilarity}`);
        }
        return _.max([newSimilarity, similarity]);
      }, 0);
    }

    return [itemRemoved, similarity];
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
    let textToReadItem = item[0];
    return {
      value: textToReadItem.value,
      position: textToReadItem.position,
      similarity: item[1],
      __backup: item
    }
  });
}

function getTextReadedDiff(original, readed) {
  if (readed.length > 0) {
    //this hack improve the diff results
    readed = `${readed.trim()} `;
  }

  const diff = diffWords(original, readed);
  let lastPartMentioned = _.findLastIndex(diff, part => isAddedPart(part) || isUnchangedPart(part));

  const isNextPartPunctuation = diff[lastPartMentioned + 1] && diff[lastPartMentioned + 1].value.length <= 2;
  if (isNextPartPunctuation) {
    lastPartMentioned = lastPartMentioned + 1;
  }

  const lastPartMentionedIsBeforeLast = lastPartMentioned + 1 === diff.length - 1;
  const lastPart = diff[diff.length - 1];

  if (lastPartMentionedIsBeforeLast && lastPart.removed) {
    const lastPartSpacesCount = lastPart.value.split(' ').length;
    if (lastPartSpacesCount <= 4) {
      lastPartMentioned = lastPartMentioned + 1;
    }
  }

  return diff.slice(0, lastPartMentioned + 1);
}

/**
 * @param  {string} original
 * @param  {string} readed
 * @return {array}
 */
function compute(original, readed) {
  let diff, unchanged, added, removed, similarity, merged, serializedSimilarity, sorted;

  diff = getTextReadedDiff(original, readed);
  [unchanged, added, removed] = categorizeAndSequenceDiff(diff);
  similarity = getSimilarity(removed, added);
  serializedSimilarity = serializeSimilarityArray(similarity);
  merged = _.concat(unchanged, serializedSimilarity)
  sorted = _.sortBy(merged, ['position']);

  return sorted;
}

function getScore(computedFeedback) {
  const similarityByWord = computedFeedback.reduce((sentences, sentence) => {
    if (sentence.value !== ' ') {
      const wordsSimilarity = sentence.value.split(' ')
        .filter(word => word !== ' ' && word !== '')
        .map(() => sentence.similarity);
      return sentences.concat(wordsSimilarity);
    }
    return sentences;
  }, [])

  let score = 0;
  if (computedFeedback.length > 0) {
    score = _.sum(similarityByWord) / similarityByWord.length;
  }
  return Math.floor(score * 100);
}

export default {
  compute,
  getScore
};