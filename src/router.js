const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render('home');
})

router.get("/articles", (req, res) => {
    res.status(200).render('articles', { articles });

})


router.get("*", (req, res) => {
  res.send("<h1>404 PAGE NOT FOUND</h1>");
});

module.exports = router;
