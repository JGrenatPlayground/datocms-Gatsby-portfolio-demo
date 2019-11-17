import React from 'react'
import {graphql, Link} from 'gatsby'
import Masonry from 'react-masonry-component'
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsArticle.edges.map(({ node: article }) => (
        <div key={article.id} className="showcase__item">
          <figure className="card">
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/article/${article.slug}`}>{article.title}</Link>
              </h6>
            </figcaption>
          </figure>
        </div>
    ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsArticle(sort: { fields: [title], order: DESC}) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`
