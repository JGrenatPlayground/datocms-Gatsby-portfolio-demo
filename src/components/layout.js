import React from "react";
import PropTypes from "prop-types";
import { graphql, Link, StaticQuery } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/index.sass";

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
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
              <Link to="/">
                <span className="linkText">
                  {data.datoCmsSite.globalSeo.siteName}
                </span>
              </Link>
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
            <div className="languageSwitcher">
              <span>FR</span>
            </div>
          </header>
        </div>
        <div className="container-fluid">{children}</div>

        <footer className="main-footer">
          <div className="footer-top-container">
            <ul className="container-fluid footer-top">
              <li>
                <a href="https://www.keolis.com/fr/notre-groupe/le-groupe-keolis/nos-valeurs">
                  We Imagine
                </a>
              </li>
              <li>
                <a href="https://www.keolis.com/fr/notre-groupe/le-groupe-keolis/nos-valeurs">
                  We Care
                </a>
              </li>
              <li>
                <a href="https://www.keolis.com/fr/notre-groupe/le-groupe-keolis/nos-valeurs">
                  We Commit
                </a>
              </li>
            </ul>
          </div>
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li className="first-level dropdown">
                <a href="https://www.keolis.com/fr">
                  Notre groupe
                </a>
                <div className="sub-menu dropdown-menu">
                  <ul className="sub-menu-list">
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/notre-groupe/keolis-acteur-mobilite"
                        className="second-level-link"
                      >
                        Keolis, acteur de la mobilité
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/notre-groupe/le-groupe-keolis"
                        className="second-level-link"
                      >
                        Le Groupe Keolis
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/notre-groupe/reseaux-emblematiques"
                        className="second-level-link"
                      >
                        Keolis, acteur international
                      </a>

                    </li>
                  </ul>
                </div>
              </li>
              <li className="first-level dropdown">
                <a
                  href="https://www.keolis.com/fr/nos-engagements"
                  className="dropdown-toggle first-level-link"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Nos engagements
                </a>
                <div className="sub-menu dropdown-menu">
                  <ul className="sub-menu-list custom-menu-display">
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/keolife-lamelioration-continue-action"
                        className="second-level-link"
                      >
                        Keolife, l’amélioration continue en action
                      </a>
                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/satisfaction-client"
                        className="second-level-link"
                      >
                        Satisfaction client
                      </a>
                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/securite"
                        className="second-level-link"
                      >
                        Sécurité
                      </a>
                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/relation-partenariale-avec-autorites-organisatrices"
                        className="second-level-link"
                      >
                        Relation Autorités Organisatrices
                      </a>
                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/excellence-operationnelle"
                        className="second-level-link"
                      >
                        Excellence opérationnelle
                      </a>
                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/responsabilite-societale"
                        className="second-level-link"
                      >
                        Responsabilité sociétale
                      </a>
                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/engagement-salaries"
                        className="second-level-link"
                      >
                        Engagement des salariés
                      </a>
                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-engagements/performance-economique"
                        className="second-level-link"
                      >
                        Performance économique
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="first-level dropdown">
                <a
                  href="https://www.keolis.com/fr"
                  className="dropdown-toggle first-level-link"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Nos expertises
                </a>
                <div className="sub-menu dropdown-menu">
                  <ul className="sub-menu-list">
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-expertises/expertise-industrielle-operationnelle"
                        className="second-level-link"
                      >
                        Expertise industrielle et opérationnelle
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-expertises/etudes-prospectives"
                        className="second-level-link"
                      >
                        Etudes prospectives Keoscopie
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-expertises/experience-client"
                        className="second-level-link"
                      >
                        Expérience client
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-expertises/mobilite-connectee"
                        className="second-level-link"
                      >
                        Mobilité connectée
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/nos-expertises/mobilite-durable"
                        className="second-level-link"
                      >
                        Mobilité durable
                      </a>

                    </li>
                  </ul>
                </div>
              </li>
              <li className="first-level dropdown">
                <a
                  href="https://www.keolis.com/fr"
                  className="dropdown-toggle first-level-link"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Notre offre
                </a>
                <div className="sub-menu dropdown-menu">
                  <ul className="sub-menu-list">
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/notre-offre/offre-transport"
                        className="second-level-link"
                      >
                        Offre de transport
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/notre-offre/offres-territoires"
                        className="second-level-link"
                      >
                        Offres territoires
                      </a>

                    </li>
                  </ul>
                </div>
              </li>
              <li className="first-level dropdown">
                <a
                  href="https://www.keolis.com/fr"
                  className="dropdown-toggle first-level-link"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Candidats
                </a>
                <div className="sub-menu dropdown-menu">
                  <ul className="sub-menu-list">
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/candidats/nous-connaitre"
                        className="second-level-link"
                      >
                        Nous connaitre
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/candidats/nous-rejoindre"
                        className="second-level-link"
                      >
                        Nous rejoindre
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/candidats/evoluer-chez-keolis"
                        className="second-level-link"
                      >
                        Evoluer chez Keolis
                      </a>

                    </li>
                    <li className="second-level">
                      <a
                        href="https://www.keolis.com/fr/candidats/postuler"
                        className="second-level-link"
                      >
                        Postuler
                      </a>

                    </li>
                  </ul>
                </div>
              </li>
              <li className="first-level dropdown">
                <a
                  href="https://www.keolis.com/fr"
                  className="dropdown-toggle first-level-link"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Medias
                </a>
                <div className="sub-menu dropdown-menu">
                  <ul className="sub-menu-list">
                    <li className="second-level">
                      <a href="https://www.keolis.com/fr" className="second-level-link">
                        Newsroom
                      </a>

                    </li>
                  </ul>
                </div>
              </li>
              <li className="first-level join-us-menu">
                <a
                  target="_blank"
                  href="https://careers.keolis.com/"
                  className="first-level-link"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Rejoignez nous
                </a>
              </li>
            </ul>
            <hr/>
            <ul className="nav navbar-nav secondary">
              <li className="first-level social">
                <h3 className="first-level-link">Restons connecté</h3>
                <p><img src="https://zupimages.net/up/20/09/q6b5.png" alt="Liste des transports" style={{width: "150px"}}/></p>
              </li>
              <li className="first-level dropdown activities">
                <h3 className="first-level-link">
                  Nos activités
                </h3>
                <p><img src="https://zupimages.net/up/20/09/gqn9.png" alt="Liste des activités" style={{width: "350px", transform: "translateX(-3px) translateY(-5px)"}}/></p>
              </li>

              <li className="first-level dropdown supply">
                <a href="https://www.keolis.com/fr/espace-fournisseur" className="button">
                  Espace fournisseur
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom-container">
            <ul className="container-fluid footer-bottom">
              <li className="footer-bottom-element">
                <a href="https://www.keolis.com/fr/formulaire-contact">Contact</a>
              </li>
              <li className="footer-bottom-element">
                <a href="https://www.keolis.com/fr/mentions-legales">Mentions légales</a>
              </li>
              <li className="footer-bottom-element">
                <a href="https://www.keolis.com/fr/politique-confidentialite">
                  Politique de confidentialité
                </a>
              </li>
              <li className="footer-bottom-element">
                <a href="https://www.keolis.com/fr/politique-gestion-cookies">Gestion des cookies</a>
              </li>
              <li className="footer-bottom-element">
                <a href="https://www.keolis.com/fr/credits">Crédits</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    )}
  />
);

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
