import React from "react";
import {HelmetDatoCms} from "gatsby-source-datocms";
import {graphql, Link} from "gatsby";
import Markdown from "markdown-to-jsx";
import Layout from "../components/layout";

export default ({ data: { datoCmsArticle: article } }) => (
  <Layout>
    <div className="sheet">
      <HelmetDatoCms seo={(<data className="article"></data>).seoMetaTags} />
      <article className="article">
        <header
          className="article-title"
          style={{ backgroundImage: "url(" + article.heroImage.url + ")" }}
        >
          <p className="breadcrumb">
            <Link to="/">Accueil</Link> > {article.title}
          </p>
          <h2>{article.title}</h2>
          <h3>
            {article.subtitle}{" "}
            <small className="article-date">({article.date})</small>
          </h3>
        </header>

        <p class="article-description">{article.description}</p>

        <div>
          {article.paragraph.map(paragraph => {
            switch (paragraph.__typename) {
              case "DatoCmsParagraphWithImage":
                return viewParagraphWithImage(paragraph);
              case "DatoCmsParagraphWithVideo":
                return viewParagraphWithVideo(paragraph);
              case "DatoCmsParagraphWithPdf":
                return viewParagraphWithPdf(paragraph);
              default:
                return <p>Nothing</p>;
            }
          })}
        </div>

        <p className="article-video">
          {article.video && (
            <iframe
              width="600"
              height="337,5"
              src={article.video.url}
              frameBorder="0"
              style={{ marginTop: "10px", marginBottom: "10px" }}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </p>

        {article.links && article.links.length > 0 && showRelatedLinks(article.links)}
      </article>
    </div>
  </Layout>
);

function showRelatedLinks(links) {
  return (<>
    <h4>Ça va vous intéresser</h4>
    <ul>
      {links.map(link => (
        <div key={link.id} className="showcase__item">
          <figure className="card">
            <img src={link.heroImage.url} alt={link.heroImage.alt} />
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/article/${link.slug}`}>{link.title}</Link>
              </h6>
            </figcaption>
          </figure>
        </div>
      ))}
    </ul>
    <div style={{clear: "both"}}></div>
  </>);
}

function viewParagraphWithVideo(paragraph) {
  return (
    <div className="paragraph paragraph--video">
      <iframe
        width="150"
        height="84,38"
        src={paragraph.video.url}
        frameBorder="0"
        style={{ margin: "5px", float: paragraph.videoPosition }}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>
        <Markdown>{paragraph.paragraph}</Markdown>
      </p>
      <div style={{ clear: "both" }}></div>
    </div>
  );
}

function viewParagraphWithImage(paragraph) {
  return (
    <div className="paragraph">
      <img
        src={paragraph.image.url}
        style={{
          float: paragraph.imagePosition,
          width: "150px",
          margin: "5px",
          padding: "5px"
        }}
      />
      <p>
        <Markdown>{paragraph.paragraph}</Markdown>
      </p>
      <div style={{ clear: "both" }}></div>
    </div>
  );
}

function viewParagraphWithPdf(paragraph) {
  return (
    <div className="paragraph">
      <p style={{ textAlign: "center" }}>
        <a href={paragraph.pdf.url}>{paragraph.pdf.title}</a>
      </p>
      <p>
        <Markdown>{paragraph.paragraph}</Markdown>
      </p>
    </div>
  );
}

export const query = graphql`
  query ArticleQuery($slug: String!) {
    datoCmsArticle(slug: { eq: $slug }) {
      id
      articleType
      date
      description
      heroImage {
        url
      }
      paragraph {
        ... on DatoCmsParagraphWithImage {
          id
          #          _modelApiKey
          imagePosition
          paragraph
          image {
            url
            alt
          }
        }
        ... on DatoCmsParagraphWithVideo {
          id
          videoPosition
          video {
            url
          }
          paragraph
        }
        ... on DatoCmsParagraphWithPdf {
          id
          paragraph
          pdf {
            url
            title
          }
        }
      }
      links {
        slug
        subtitle
        title
        heroImage {
          url
        }
      }
      slug
      subtitle
      title
      video {
        url
        title
        thumbnailUrl
      }
    }
  }
`;
