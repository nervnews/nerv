const express = require("express");
const { guardianListing, guardianItem } = require('./api/guardian');
const qs = require('querystring');
const sentiment = require('sentiment');
const polarity = require('polarity');
const emotional = require('emotional');
const bodyParser = require("body-parser");
const router = express.Router();

exports.home = (re, res) => {
  res.render('home');
}

exports.listArticles = (req, res) => {
  const query = req.body.search;
  guardianListing(query, 1, results => {
    const articles = results;
    res.status(200).render("articles", { articles });
  });
}

exports.visualize = (req, res) => {
  res.status(200).render('visualize');
}

exports.sentiments = (req, res) => {
  const query = req.url.split('visualize')[1]
  guardianItem(query, response => {
    const text = response.response.content.fields.bodyText;
    emotional.load(() => {
      const emotions = emotional.get(text);
      emotions["positive"] = emotional.positive(text);
      const sentimentData = sentiment(text);
      const polarityData = polarity(sentimentData.tokens);
      const data = {
        sentiments: {
          Emotions: emotions,
          Sentiment: sentimentData,
          Polarity: polarityData
        }
      };
      res.json(data);
    });
  });
}
