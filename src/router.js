const express = require("express");
const router = express.Router();
const guardianListing = require("./api/guardian");
const bodyParser = require("body-parser");

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/articles", (req, res) => {
  query = req.body.search;
  guardianListing(query, 1, results => {
    const articles = results;
    res.status(200).render("articles", { articles });
  });
});

router.get("*", (req, res) => {
  res.send("<h1>404 PAGE NOT FOUND</h1>");
});

module.exports = router;
