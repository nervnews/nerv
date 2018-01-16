const Guardian = require("guardian-js");
const guardian_filter = require("./guardian_filter");

<<<<<<< HEAD
const guardianListing = (query, cb) => {
  const api = new Guardian(guardian_key, false);
=======
const guardianKey = (query, cb) => {
  const welvonAPI = new Guardian(process.env.GUARDIAN_KEY, false);
>>>>>>> e232b0b6152dd9ed502335bfefebb134f967432f

  welvonAPI.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,page,lastModified"
    })
    .then(response => {
      console.log('here '+response.body);
      cb(JSON.parse(response.body));
    });
};

module.exports = guardianListing;
