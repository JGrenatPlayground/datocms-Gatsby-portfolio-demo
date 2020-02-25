const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

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
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsArticle.edges.map(({ node: article }) => {
        createPage({
          path: `article/${article.slug}`,
          component: path.resolve(`./src/templates/article.js`),
          context: {
            slug: article.slug
          }
        });
      });
      resolve();
    });
  });
}

function buildPress(graphql, createPage) {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsArticle(
          filter: { articleType: { in: ["press", "interview"] } }
        ) {
          edges {
            node {
              _allTitleLocales {
                locale
                value
              }
              title
              slug
            }
          }
        }
      }
    `).then(
      result => {
        result.data.allDatoCmsArticle.edges.map(({ node: article }) => {
          console.log(article);
          console.log("\n\n--------------\n\n");
          createPage({
            path: `press/${article.slug}`,
            component: path.resolve(`./src/templates/press.js`),
            context: {
              slug: article.slug
            }
          });
        });
        resolve();
      },
      err => console.log("Error carotte", err)
    );
  });
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return Promise.all([
    buildArticles(graphql, createPage),
    buildPress(graphql, createPage)
  ]);
};
