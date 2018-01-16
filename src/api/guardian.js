const Guardian = require("guardian-js");
const guardian_filter = require("./guardian_filter");


const guardianListing = (query, cb) => {
 
  const welvonAPI = new Guardian(process.env.GUARDIAN_KEY, false);
  welvonAPI.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,page,lastModified"
    })
    .then(response => {
      cb(JSON.parse(response.body.response));
    });
};

module.exports = guardianListing;
