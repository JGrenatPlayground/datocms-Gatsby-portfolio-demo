const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)


function buildArticles(graphql, createPage) {
  return new Promise((resolve, reject) => {
    graphql(`
{
  allDatoCmsArticle {
    edges {
      node {
        _allTitleLocales {
          locale
          value
        }
        title
        slug
  }}}
}`).then(result => {
  console.log(result.data.allDatoCmsArticle.edges);
      result.data.allDatoCmsArticle.edges.map(({node: article}) => {
          console.log(article);
          console.log("\n\n--------------\n\n");
        createPage({
          path: `article/${article.slug}`,
          component: path.resolve(`./src/templates/article.js`),
          context: {
            slug: article.slug,
          },
        });
      });
      resolve()
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return Promise.all([
      // buildWorks(graphql, createPage),
      buildArticles(graphql, createPage)
  ]);
}
