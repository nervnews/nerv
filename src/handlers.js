const { guardianListing, guardianItem, guardianLatest } = require('./models/guardian');
const textProcessing = require('./models/text_processing');
const path = require('path');

let series = [];
const state = { text: 'Continue with facebook', link: '/auth/facebook' };

exports.home = (req, res) => {
  guardianLatest(1, (results) => {
    const articles = results;
    res.status(200).render('home', { articles, state });
  });
};

exports.listArticles = (req, res) => {
  const query = req.body.search;
  guardianListing(query, 1, (results) => {
    const articles = results;
    res.status(200).render('articles', { articles, state });
  });
};

exports.visualize = (req, res) => {
  res.status(200).render('visualize', { state });
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

exports.visualizeAll = (req, res) => {
  let totalText = '';
  let count = req.body.articleID.length;
  req.body.articleID.forEach((articleID) => {
    guardianItem(articleID, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        totalText += result.bodyText;
        series.push({
          data: textProcessing(result.bodyText),
          title: result.headline,
        });
        if (count === 1) {
          series.push({
            data: textProcessing(totalText),
            title: 'Visualizing All The Articles',
          });
          res.sendFile(path.join(`${__dirname}/../public/html/all.html`));
        } else {
          count -= 1;
        }
      }
    });
  });
};

exports.visualizeAllJSON = (req, res) => {
  res.send(series);
  series = [];
};

exports.oAuthRedirct = (req, res) => {
  res.redirect('/oauth/dashboard');
};

exports.error = (req, res) => {
  res.status(404).render('error');
};
