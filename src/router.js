const express = require("express");
const router = express.Router();
const guardianKey = require("./api/guardian")

router.get("/", (req, res) => {
  res.render('home');
})

router.get("/articles", (req, res) => {
    const articles = {
      0: {
        id: "sport/live/2018/jan/15/australian-open-2018-rafa-nadal-caroline-wozniacki-tennis-action-day-one-live",
        type: "liveblog",
        sectionId: "sport",
        sectionName: "Sport",
        webPublicationDate: "2018-01-15T09:03:25Z",
        webTitle: "Australian Open 2018: Nadal, Kyrgios, Wozniacki and more in action on day one – live!",
        webUrl: "https://www.theguardian.com/sport/live/2018/jan/15/australian-open-2018-rafa-nadal-caroline-wozniacki-tennis-action-day-one-live",
        apiUrl: "https://content.guardianapis.com/sport/live/2018/jan/15/australian-open-2018-rafa-nadal-caroline-wozniacki-tennis-action-day-one-live",
        fields:
        {
            headline: "Australian Open 2018: Nadal, Kyrgios, Wozniacki and more in action on day one – live!",
            body: "...",
            shortUrl: "https://gu.com/p/7qq2b",
            thumbnail: "https://media.guim.co.uk/00ef68b0881552a7d9f370cd83fafd03d8f02c86/10_0_3289_1974/500.jpg"
        },
        isHosted: false,
        pillarId: "pillar/sport",
        pillarName: "Sport"
      }
    }

    res.status(200).render('articles', { articles });

})

// router.get("*", (req, res)=> {
//   res.send('<h1>404 PAGE NOT FOUND</h1>')
// })







router.get("*", (req, res) => {
  res.send("<h1>404 PAGE NOT FOUND</h1>");
});

module.exports = router;
