const express = require("express");
const { guardianListing, guardianItem } = require("./models/guardian");
const textProcessing = require("./models/text_processing");
exports.home = (re, res) => {
  res.render("home");
};

exports.listArticles = (req, res) => {
  const query = req.body.search;
  guardianListing(query, 1, results => {
    const articles = results;
    res.status(200).render("articles", { articles });
  });
};

exports.visualize = (req, res) => {
  res.status(200).render("visualize");
};

exports.sentiments = (req, res) => {
  const query = req.url.split("visualize")[1];
  guardianItem(query, (err, result) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send(textProcessing(result));
    }
  });
};
