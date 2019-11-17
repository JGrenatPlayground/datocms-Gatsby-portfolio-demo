import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import {graphql, Link} from 'gatsby'
import Markdown from 'markdown-to-jsx';
import Layout from "../components/layout"

export default (({data: {datoCmsArticle: article}}) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={<data className="article"></data>.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{article.title} <small style={{fontSize: '20px'}}>({article.date})</small></h1>
        <h2 className="sheet__subtitle">{article.subtitle}</h2>
        <p>Type: {article.articleType}</p>
        <img src={article.heroImage.url} alt="" style={{width: '100%', marginTop:'10px', marginBottom:'10px'}}/>
        <p>{article.description}</p>

        <div>
          {article.paragraph.map(paragraph => {
            switch(paragraph.__typename) {
              case 'DatoCmsParagraphWithImage':
                return viewParagraphWithImage(paragraph);
              case 'DatoCmsParagraphWithVideo':
                return viewParagraphWithVideo(paragraph);
              case 'DatoCmsParagraphWithPdf':
                return viewParagraphWithPdf(paragraph);
              default:
                return (<p>Nothing</p>);
            }
          })}
        </div>

        <iframe width="600" height="337,5" src={article.video.url} frameBorder="0" style={{marginTop:'10px', marginBottom:'10px'}}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        <ul>{article.links.map((link) => (<li><Link to={"article/" + link.slug}>{link.title}</Link></li>))}</ul>
      </div>
    </article>
  </Layout>
));

function viewParagraphWithVideo(paragraph) {
  return (
  <div className="paragraph">
    <iframe width="150" height="84,38" src={paragraph.video.url} frameBorder="0" style={{margin:'5px', float: paragraph.videoPosition}}
               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen></iframe>
      <p><Markdown>{paragraph.paragraph}</Markdown></p>
    <div style={{clear: 'both'}}></div>
  </div>);
}

function viewParagraphWithImage(paragraph) {
  return (
  <div className="paragraph">
    <img src={paragraph.image.url} style={{float: paragraph.imagePosition, width: '150px', margin: '5px', padding: '5px'}}/>
      <p><Markdown>{paragraph.paragraph}</Markdown></p>
    <div style={{clear: 'both'}}></div>
  </div>);
}

function viewParagraphWithPdf(paragraph) {
  return (
  <div className="paragraph">
    <p style={{textAlign: 'center'}}><a href={paragraph.pdf.url}>{paragraph.pdf.title}</a></p>
      <p><Markdown>{paragraph.paragraph}</Markdown></p>
  </div>);
}

export const query = graphql`
  query ArticleQuery($slug: String!) {
    datoCmsArticle(slug: {eq: $slug}) {
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

`
