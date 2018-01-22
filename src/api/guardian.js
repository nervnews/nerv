const Guardian = require("guardian-js");
const guardian_filter = require("./guardian_filter");
let allArticles = [];

const guardianListing = (query, page, cb) => {
  const welvonAPI = new Guardian(process.env.GUARDIAN_KEY, false);
  welvonAPI.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,page,lastModified",
      pages: page
    })
    .then(response => {
      jsonRes = JSON.parse(response.body).response;
      const { currentPage, pageSize } = jsonRes;
      if (currentPage == 1) allArticles = [];
      if (currentPage + 1 <= pageSize && currentPage < 5) {
        allArticles = allArticles.concat(guardian_filter(jsonRes));
        guardianListing(query, currentPage + 1, cb);
      } else {
        cb(allArticles.concat(guardian_filter(jsonRes)));
      }
    });
};


const guardianItem = (id, cb) => {
  const api = new Guardian(process.env.GUARDIAN_KEY, false);
  api.item.search(id, { "show-fields": "bodyText" })
    .then(response => {
      cb(JSON.parse(response.body))
    });
}

module.exports = {
  guardianListing,
  guardianItem
}
