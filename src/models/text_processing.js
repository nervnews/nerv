const sentiment = require("sentiment");
const stopword = require("stopword");
const natural = require("natural");
const stopWordList = require("./stopWords.js")();
const sigmoid = require("./sigmoid");

module.exports = text => {
  const t_lowerCase = text.toLowerCase();

  const tokenizer = new natural.WordPunctTokenizer();
  const t_tokenized = tokenizer.tokenize(t_lowerCase);
  const t_stopword = stopword.removeStopwords(t_tokenized, stopWordList);
  const t_removed_punct = t_stopword
    .map(word => {
      return word.replace(/[&\/\\#,+\(\)$~%\.!^'"\;:*?\[\]<>{}\s`”’]/g, "");
    })
    .filter(word => {
      if (word != undefined && word.length > 1) {
        return word;
      }
    });

  const NounInflector = new natural.NounInflector();

  const t_singular = t_removed_punct.map(word => {
    try {
      return NounInflector.singularize(word);
    } catch (err) {
      console.log("error", err);
    }
  });

  const t_presentVerb = t_singular.map(word => {
    try {
      return VerbInflector.singularize(t_singular);
    } catch (err) {}
  });

  const t_sentiment = sentiment(t_singular.join(" "));

  const positive_tokens = t_sentiment.positive;
  const negative_tokens = t_sentiment.negative;

  const wordFreq = textArray => {
    let freqObj = {};
    textArray.forEach(word => {
      if (freqObj.hasOwnProperty(word)) freqObj[word] += 1;
      else freqObj[word] = 1;
    });
    return freqObj;
  };

  t_wordFreq = wordFreq(t_singular);
  const max = Math.max(...Object.keys(t_wordFreq).map(k => t_wordFreq[k]));
  const sigmoidFunc = sigmoid(max);
  var wordFreqSorted = [];
  for (var word in t_wordFreq) {
    wordFreqSorted.push([word, t_wordFreq[word]]);
  }
  wordFreqSorted.sort(function(a, b) {
    return b[1] - a[1];
  });

  var finalArr = wordFreqSorted.map(element => {
    var obj = {};
    obj["word"] = element[0];
    obj["freq"] = element[1];
    obj["sentiment"] = "neutral";
    obj["size"] = 0;
    obj["color_score"] = 0;
    return obj;
  });

  const sentimentInsert = value => {
    var token = value["word"];
    if (positive_tokens.includes(token)) {
      value["sentiment"] = "positive";
      value["color_score"] = 1;
    } else if (negative_tokens.includes(token)) {
      value["sentiment"] = "negative";
      value["color_score"] = -1;
    }
    return word;
  };

  const score_calculator = value => {
    value["size"] = value["freq"];
    if (value["sentiment"] != "neutral") {
      value["size"] = sigmoidFunc(value.freq);
    }
  };

  finalArr.map(sentimentInsert);
  finalArr.map(score_calculator);
  finalArr.sort(function(a, b) {
    return b.size - a.size;
  });

  return finalArr.splice(0, 20);
};
