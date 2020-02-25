import React from "react";
import { graphql, Link } from "gatsby";
import Masonry from "react-masonry-component";
import Layout from "../components/layout";
import GoogleMapReact from "google-map-react";

const IndexPage = ({ data }) => {
  const center = {
    lat: 59.95,
    lng: 30.33
  };
  const zoom = 11;

  return (
    <Layout>
      <h2
        className="introText"
        dangerouslySetInnerHTML={{
          __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
        }}
      />

      <div
        className="hero"
        style={{
          backgroundImage:
            "url(https://www.keolis.com/sites/default/files/thumbnails/image/visuel-pulse-web-keolis_0.jpg)"
        }}
      >
        <a
          className="hero-content"
          href="/fr/pulse-5-faire-avancer-mobilite-quotidien"
        >
          <div className="hero-tag">
            #Découvrez la nouvelle version du magazine
          </div>
          <h3 className="hero-title">
            Il est de retour : Pulse #5, Faire avancer la mobilité du quotidien
          </h3>
          <div className="hero-date">20.02.2020</div>
          <div className="arrow">&gt;</div>
        </a>
      </div>

      <Masonry className="showcase">
        {data.allDatoCmsArticle.edges.map(({ node: article }) => (
          <div key={article.id} className="showcase__item">
            <figure className="card">
              <img src={article.heroImage.url} alt={article.heroImage.alt} />
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/article/${article.slug}`}>{article.title}</Link>
                </h6>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>

      {data.datoCmsHome.joinUs.length > 0 && data.datoCmsHome.joinUs[0].display && (
        <section className="joinUsSection">
          <h3 className="joinUsSection-title">{data.datoCmsHome.joinUs[0].title}</h3>
          <div className="joinUsSection-video">
            <iframe
              src={data.datoCmsHome.joinUs[0].video.url}
              frameBorder="0"
              style={{margin: "auto"}}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <a href="{data.datoCmsHome.joinUs[0].link}" className="joinUsSection-link">
            {data.datoCmsHome.joinUs[0].linkText}
          </a>
        </section>
      )}


      <img
        src={data.datoCmsHome.numbers.url}
        alt={data.datoCmsHome.numbers.alt}
        style={{ marginBottom: "20px" }}
      />

      <div style={{ height: "60vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAVs-wn-tKSyyz-1-D8dTBkUhFrWKBOLvs" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {data.allDatoCmsMarker.edges.map(({ node: marker }) => (
            <div
              key={marker.id}
              lat={marker.coordinates.latitude}
              lng={marker.coordinates.longitude}
              style={{ color: "white", textAlign: "center" }}
            >
              {marker.markerName}
            </div>
          ))}
        </GoogleMapReact>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsArticle(sort: { fields: [title], order: DESC }) {
      edges {
        node {
          id
          title
          slug
          heroImage {
            url
            alt
          }
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
    datoCmsHome {
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      joinUs {
        display
        title
        link
        linkText
        video {
          url
          title
          thumbnailUrl
        }
      }
      numbers {
        url
        alt
      }
    }
  }
`;
