const express = require("express");
const guardianKey = require('./api/guardian');
const qs = require('querystring');
const router = express.Router();

router.get("/", (req, res) => {
  res.render('home');
})

router.get("/articles", (req, res) => {
    guardianKey('israel', ( response ) => {
      const articles = response.response.results;
      console.log(articles);
        res.status(200).render('articles', { articles });
    })
})

router.get("*", (req, res)=> {
  res.send('<h1>404 PAGE NOT FOUND</h1>')
})

module.exports = router;
