const Guardian = require("guardian-js");
const guardian_key = process.env.GUARDIAN_KEY;

const guardianListing = (query, cb) => {
  const api = new Guardian(guardian_key, false);

  api.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,lastModified"
    })
    .then(response => {
      console.log('here '+response.body);
      cb(JSON.parse(response.body));
    });
};

module.exports = guardianListing;
