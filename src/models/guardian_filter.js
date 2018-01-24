module.exports = (response) => {
  const results = response.results.reduce((articles, { fields, id }) => {
    articles.push({
      id,
      image: fields.thumbnail,
      headline: fields.headline,
      trailText: fields.trailText,
      bodyText: fields.bodyText,
      url: fields.shortUrl,
    });
    return articles;
  }, []);
  return results;
};
