import React from 'react'
import {graphql, Link} from 'gatsby'
import Masonry from 'react-masonry-component'
import Layout from "../components/layout"
import GoogleMapReact from "google-map-react";


const IndexPage = ({ data }) => {
  const  center = {
    lat: 59.95,
        lng: 30.33
  };
  const zoom = 11;
  return (
      <Layout>
        <Masonry className="showcase">
          {data.allDatoCmsArticle.edges.map(({node: article}) => (
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
        <div style={{height: '60vh', width: '90%'}}>
          <GoogleMapReact
              bootstrapURLKeys={{key: 'AIzaSyDzONgO_yNGqqf-O47daaWyKexgmN3OsJk'}}
              defaultCenter={center}
              defaultZoom={zoom}
          >

            {data.allDatoCmsMarker.edges.map(({node: marker}) => (
                <div
                    lat={marker.coordinates.latitude}
                    lng={marker.coordinates.longitude}
                    style={{color: 'white', textAlign: 'center'}}
                >{marker.markerName}
                </div>
            ))}

          </GoogleMapReact>
        </div>
      </Layout>
  );
}

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
    allDatoCmsMarker {
      edges {
        node {
          id
          markerName
          coordinates {
            latitude
            longitude
          }
        }
      }
    }
  }
`
