module.exports = response => {
  console.log(response.results.constructor);
  let results = response.results.reduce((articles, article) => {
    articles.push({
      id: article.id,
      image: article.fields.thumbnail,
      headline: article.fields.headline,
      trailText: article.fields.trailText,
      bodyText: article.fields.bodyText
    });
    return articles;
  }, []);
  return results;
};
