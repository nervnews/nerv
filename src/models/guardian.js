const Guardian = require('guardian-js');
const guardianFilter = require('./guardian_filter');

let allArticles = [];

const guardianListing = (query, page, cb) => {
  const welvonAPI = new Guardian(process.env.GUARDIAN_KEY, false);
  welvonAPI.content
    .search(query, {
      'show-fields': 'headline,trailText,thumbnail,bodyText,page,lastModified,shortUrl',
      page,
    })
    .then((response) => {
      const jsonRes = JSON.parse(response.body).response;
      const { currentPage, pageSize } = jsonRes;
      if (currentPage == 1) allArticles = [];
      if (currentPage + 1 <= pageSize && currentPage < 5) {
        allArticles = allArticles.concat(guardianFilter(jsonRes));
        guardianListing(query, currentPage + 1, cb);
      } else {
        cb(allArticles.concat(guardianFilter(jsonRes)));
      }
    });
};

const guardianItem = (id, cb) => {
  const api = new Guardian(process.env.GUARDIAN_KEY, false);
  api.item.search(id, { 'show-fields': 'bodyText,headline' }).then((response) => {
    const jsonRes = JSON.parse(response.body);

    if (jsonRes.response.status === 'ok') {
      return cb(null, jsonRes.response.content.fields);
    }
    cb(`Error${jsonRes}`);
  });
};

const guardianLatest = (page, cb) => {
  const api = new Guardian(process.env.GUARDIAN_KEY, false);
  api.custom
    .search({
      'show-fields': 'headline,trailText,thumbnail,page,lastModified,shortUrl',
      page,
    })
    .then((response) => {
      const jsonRes = JSON.parse(response.body).response;
      const { currentPage, pageSize } = jsonRes;
      if (currentPage === 1) allArticles = [];
      if (currentPage + 1 <= pageSize && currentPage < 3) {
        allArticles = allArticles.concat(guardianFilter(jsonRes));
        guardianLatest(currentPage + 1, cb);
      } else {
        cb(allArticles.concat(guardianFilter(jsonRes)));
      }
    });
};

module.exports = {
  guardianListing,
  guardianItem,
  guardianLatest,
};
