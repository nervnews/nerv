const express = require('express');
const { guardianListing, guardianItem, guardianLatest } = require('./models/guardian');
const textProcessing = require('./models/text_processing');

exports.home = (req, res) => {
  guardianLatest(1, (results) => {
    const articles = results;
    res.status(200).render('home', { articles });
  });
};

exports.listArticles = (req, res) => {
  const query = req.body.search;
  guardianListing(query, 1, (results) => {
    const articles = results;
    res.status(200).render('articles', { articles });
  });
};

exports.visualize = (req, res) => {
  res.status(200).render('visualize');
};

exports.sentiments = (req, res) => {
  const query = req.url.split('visualize')[1];
  guardianItem(query, (err, result) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send({
        data: textProcessing(result.bodyText),
        title: result.headline,
      });
    }
  });
};

exports.error = (req, res) => {
  res.status(404).render('error');
};
