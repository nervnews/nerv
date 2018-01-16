const Guardian = require("guardian-js");

const guardianListing = (query, cb) => {
  const api = new Guardian(process.env.GUARDIAN_KEY, false);
  api.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,lastModified"
    })
    .then(response => {
      cb(JSON.parse(response.body));
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
