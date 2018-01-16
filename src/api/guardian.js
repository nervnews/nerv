const Guardian = require("guardian-js");
const guardian_filter = require("./guardian_filter");


const guardianListing = (query, cb) => {
 
  const welvonAPI = new Guardian(process.env.GUARDIAN_KEY, false);
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
