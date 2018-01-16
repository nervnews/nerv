const Guardian = require("guardian-js");
const guardian_filter = require("./guardian_filter");
let allArticles = [];
const guardianKey = (query, page, cb) => {
  const welvonAPI = new Guardian(process.env.GUARDIAN_KEY, false);


const guardianListing = (query, cb) => {
 
  const welvonAPI = new Guardian(process.env.GUARDIAN_KEY, false);
  welvonAPI.content
    .search(query, {
      "show-fields": "headline,trailText,thumbnail,bodyText,page,lastModified",
      page: page
    })
    .then(response => {
      json_res = JSON.parse(response.body).response;
      const { currentPage, pageSize } = json_res;
      console.log(currentPage, pageSize);
      if (currentPage + 1 <= pageSize) {
        allArticles = allArticles.concat(guardian_filter(json_res));
        guardianKey(query, currentPage + 1, cb);
      } else {
        cb(allArticles.concat(guardian_filter(json_res)));
      }
    });
};

module.exports = guardianListing;
