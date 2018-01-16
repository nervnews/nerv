const Guardian = require("guardian-js");
const guardian_key = process.env.GUARDIAN_KEY;

const guardianKey = (query, cb) => {
  const api = new Guardian(guardian_key, false);
  api.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,lastModified"
    })
    .then(response => {
      cb(JSON.parse(response.body));
    });
};

const guardianItem = (id, cb) => {
  const api = new Guardian(guardian_key, false);
  api.item
    .search(id, {
      "show-fields": "bodyText"
    })
    .then(response => {
      cb(JSON.parse(response.body))
    });
}

module.exports = {
  guardianKey,
  guardianItem
}
