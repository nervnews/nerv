const express = require("express");
const { guardianListing, guardianItem } = require('./api/guardian');
const qs = require('querystring');
const sentiment = require('sentiment');
const polarity = require('polarity');
const emotional = require('emotional');
const bodyParser = require("body-parser");
const router = express.Router();


router.get("/", (req, res) => {
  res.render('home');
})

router.post("/articles", (req, res) => {
  const query = req.body.search;
    guardianListing(query, (response) => {
      const articles = response.response.results;
      res.status(200).render('articles', { articles });
  })
})

router.post('/visualize', (req, res) => {
  const article = req.body;
  guardianItem(article, (response) => {
    const text = response.response.content.fields.bodyText;
    emotional.load(() => {
      const emotions = emotional.get(text)
        emotions['positive'] = emotional.positive(text)
        const sentimentData = sentiment(text)
        const polarityData = polarity(sentimentData.tokens)
        const data = {
          "sentiments": {
            'Emotions' : emotions,
            'Sentiment' : sentimentData,
            'Polarity' : polarityData
          }
        }
      res.send(data)
    })
  })
})

router.get("*", (req, res)=> {
  res.send('<h1>404 PAGE NOT FOUND</h1>')
})

module.exports = router;
