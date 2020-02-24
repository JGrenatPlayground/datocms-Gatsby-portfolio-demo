import React, {useEffect, useState} from 'react'
import {Link} from 'gatsby'
import Masonry from 'react-masonry-component'
import Layout from "../components/layout"
import RSSParser from 'rss-parser';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

const RssPage = ({ data }) => {
  const [rss, setElements] = useState([]);
  useEffect(() => {
    let parser = new RSSParser();
    parser.parseURL(CORS_PROXY + 'https://www.bus-artis.fr/infotrafic.xml', function(err, feed) {
      if (err) {
          console.log(err);
          return;
      }
      setElements(feed.items);
    });
  });
  return (
      <Layout>
        <Masonry className="showcase">
          {rss.map(element => (
              <div key={element.title} className="showcase__item">
                <figure className="card">
                  <figcaption className="card__caption">
                    <h6 className="card__title">
                      <Link to={`/article/${element.title}`}>{element.title}</Link>
                    </h6>
                  </figcaption>
                </figure>
              </div>
          ))}
        </Masonry>
      </Layout>
  );
};


export default RssPage
