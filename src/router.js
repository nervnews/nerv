const express = require("express");
const guardian = require("./api/guardian");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>You are in the homepage</h1>");
});

router.get("*", (req, res) => {
  res.send("<h1>404 PAGE NOT FOUND</h1>");
});

module.exports = router;
