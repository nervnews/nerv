const sentiment = require('sentiment');
const stopword = require('stopword');
const natural = require('natural');
const stopWordList = require('./stopWords.js')();
const sigmoid = require('./sigmoid');

module.exports = (text) => {
  const lowerCased = text.toLowerCase();

  const tokenizer = new natural.WordPunctTokenizer();
  const tokenized = tokenizer.tokenize(lowerCased);
  const stopwordRemoved = stopword.removeStopwords(tokenized, stopWordList);
  const punctRemoved = stopwordRemoved
    .map(word => word.replace(/[&\/\\#,+\(\)$~%\.!^'"\;:*?\[\]<>{}\s`”’]/g, ''))
    .filter((word) => {
      if (word != undefined && word.length > 1) {
        return word;
      }
    });

  const NounInflector = new natural.NounInflector();
  const singularized = punctRemoved.map(word => NounInflector.singularize(word));
  const sentimented = sentiment(singularized.join(' '));

  const positiveTokens = sentimented.positive;
  const negativeTokens = sentimented.negative;

  const wordFreq = (textArray) => {
    const freqObj = {};
    textArray.forEach((word) => {
      if (freqObj.hasOwnProperty(word)) freqObj[word] += 1;
      else freqObj[word] = 1;
    });
    return freqObj;
  };

  const wordFreqCounted = wordFreq(singularized);
  const max = Math.max(...Object.keys(wordFreqCounted).map(k => wordFreqCounted[k]));
  const sigmoidFunc = sigmoid(max);
  const wordFreqSorted = [];
  for (var word in wordFreqCounted) {
    wordFreqSorted.push([word, wordFreqCounted[word]]);
  }
  wordFreqSorted.sort((a, b) => b[1] - a[1]);

  const finalArr = wordFreqSorted.map((element) => {
    const obj = {};
    obj.word = element[0];
    obj.freq = element[1];
    obj.sentiment = 'neutral';
    obj.size = 0;
    obj.colorScore = 'green';
    return obj;
  });

  const sentimentInsert = (value) => {
    const token = value.word;
    if (positiveTokens.includes(token)) {
      value.sentiment = 'positive';
      value.colorScore = 'blue';
    } else if (negativeTokens.includes(token)) {
      value.sentiment = 'negative';
      value.colorScore = 'red';
    }
    return word;
  };

  const scoreCalculator = (value) => {
    value.size = value.freq;
    if (value.sentiment != 'neutral') {
      value.size = sigmoidFunc(value.freq);
    }
  };

  finalArr.map(sentimentInsert);
  finalArr.map(scoreCalculator);
  finalArr.sort((a, b) => b.size - a.size);

  return finalArr.splice(0, 20);
};
