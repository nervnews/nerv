const handlers = require("./handlers");
const router = require("express").Router();

router.get("/", handlers.home);
router.post("/articles", handlers.listArticles);
router.get("/visualize", handlers.visualize);
router.get(
  "/visualize/:categorie/:year/:month/:day/:title",
  handlers.sentiments
);

router.get("*", (req, res) => {
  res.send("<h1>404 PAGE NOT FOUND</h1>");
});

module.exports = router;
