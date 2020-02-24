import React, {useState} from 'react'
import {graphql, Link} from 'gatsby'
import Masonry from 'react-masonry-component'
import Layout from "../components/layout"

const ListPage = ({ data }) => {
  const [showPress, setShowPress] = useState(true);
  const [showInterview, setShowInterview] = useState(true);
  const years = [...new Set(data.allDatoCmsArticle.edges
      .map(({node: article}) => article.date.split('-')[0]))];
  const [selectedYears, setSelectedYears] = useState(new Set(years));
  const articles = data.allDatoCmsArticle.edges
    .filter(({node: article}) => (showPress && article.articleType === 'press') || (showInterview && article.articleType === 'interview'))
    .filter(({node: article}) => selectedYears.has(article.date.split('-')[0]));
  const toggleYear = year => {
      if(selectedYears.has(year)) {
          selectedYears.delete(year);
          setSelectedYears(new Set(selectedYears));
      } else {
          selectedYears.add(year);
          setSelectedYears(new Set(selectedYears));
      }
  };
  return (
      <Layout>
        <h1 style={{ fontSize: '3rem'}}>Press & Interviews</h1>
        <form>
            <div>
                <label><input type="checkbox" name="press" checked={showPress} onChange={() => setShowPress(!showPress)}/> Press</label>
                <label><input type="checkbox" name="interview" checked={showInterview} onChange={() => setShowInterview(!showInterview)}/> Interviews</label>
            </div>
            <div>
                {years.map(year => (<label key={year}>
                    <input type="checkbox" name="interview" checked={selectedYears.has(year)} onChange={() => toggleYear(year)}/> {year}
                </label>))
                }
            </div>
        </form>
        <Masonry className="showcase">
          {articles.map(({node: article}) => (
              <div key={article.id} className="showcase__item" style={{height: '380px'}}>
                <figure className="card">
                  <div style={{
                    width: '100%;',
                    paddingTop: '60%',
                    backgroundImage: `url(${article.heroImage.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  }}></div>
                  <figcaption className="card__caption">
                    <h6 className="card__title">
                      <Link to={`/press/${article.slug}`}>{article.title}</Link>
                    </h6>
                    <p className="block-ellipsis">{article.description}</p>
                  </figcaption>
                </figure>
              </div>
          ))}
        </Masonry>
      </Layout>
  );
};

export default ListPage

export const query = graphql`
  query ListQuery {
    allDatoCmsArticle(sort: { fields: [date], order: DESC}, filter: {articleType: {in: ["press", "interview"]}}) {
      edges {
        node {
          id
          title
          articleType
          description
          slug
          date
          heroImage {
            url
          }
        }
      }
    }
  }
`
