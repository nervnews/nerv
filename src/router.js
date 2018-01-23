const handlers = require("./handlers");
const router = require("express").Router();
const passport = require("passport");

router.get("/", handlers.home);
router.post("/articles", handlers.listArticles);
router.get("/visualize", handlers.visualize);
router.get(
  "/visualize/:categorie/:year/:month/:day/:title",
  handlers.sentiments
);
router.get(
    "/auth/facebook", passport.authenticate("facebook"),
    (req, res) => {}
);
router.get(
    "/auth/facebook/callback", passport.authenticate("facebook",
        { failureRedirect: "/" }
    ),
    (req, res) => { 
        res.redirect("/oauth/dashboard");
    }
);

module.exports = router;
