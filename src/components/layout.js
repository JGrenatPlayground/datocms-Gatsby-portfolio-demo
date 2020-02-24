import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'

import '../styles/index.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery query={graphql`
    query LayoutQuery
    {
      datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
        copyright
      }
      allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
        edges {
          node {
            profileType
            url
          }
        }
      }
    }
  `}
  render={data => (
    <div className="container">
      <HelmetDatoCms
        favicon={data.datoCmsSite.faviconMetaTags}
        seo={data.datoCmsHome.seoMetaTags}
      />
      <div className="header-container">
        <header className="header container-fluid">
            <h1 className="logo">
              <Link to="/"><span class="linkText">{data.datoCmsSite.globalSeo.siteName}</span></Link>
            </h1>
            <ul className="navbar">
              <li className="navbar-item">
                <Link to="/">Notre groupe</Link>
              </li>
              <li className="navbar-item">
                <Link to="/list">Nos engagements</Link>
              </li>
              <li className="navbar-item">
                <Link to="/about">Nos expertises</Link>
              </li>
              <li className="navbar-item">
                <Link to="/about">Notre offre</Link>
              </li>
              <li className="navbar-item">
                <Link to="/about">Candidats</Link>
              </li>
              <li className="navbar-item">
                <Link to="/about">Medias</Link>
              </li>
              <li className="navbar-item join-us">
                <Link to="https://careers.keolis.com/">Rejoignez nous</Link>
              </li>
            </ul>
            <div class="languageSwitcher">
              <span>FR</span>
            </div>
        </header>
      </div>
      <div className="container-fluid">
        {children}
      </div>
    </div>
    )}
  />
)

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
