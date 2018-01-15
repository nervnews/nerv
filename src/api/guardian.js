const guardian = require("guardian-js");
require("env2")("./config.env");
const guardian_key = process.env.GUARDIAN_KEY;

const guardianKey = (query, cb) => {
  let api = new guardian(guardian_key, false);

  api.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,lastModified"
    })
    .then(response => {
      cb(response.body);
    });
};

module.exports = guardianKey;
