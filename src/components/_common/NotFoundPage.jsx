import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import Breadcrumbs from './Breadcrumbs';
import routing from "../../config/routing";

import notFoundNumber from "../../img/svg/4.svg";
import foundRing from "../../img/found_ring.png";
import foundDiamond from "../../img/found_diamond.png";
import MetaTags from './SEO/MetaTags';
import { dataLayerPush } from '../../utils/dataLayer';

export default class NotFoundPage extends React.Component {
  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }
  render() {
    return (
      <Fragment>
        <MetaTags page="not-found" h1="Page not found"/>
        <section className="not-found-section">
          <div className="container">
            {/*<Breadcrumbs marks={[{ title: 'Not found' }]} />*/}
            <div className="not-found">
              <p className="section-title">Oops..! Page not found.</p>
              <div className="not-found__img">
                <img
                  className="not-found__number"
                  src={notFoundNumber}
                  alt="Not found number 4"
                />
                <div className="not-found-link">
                  <Link
                    to={routing().engagementFeed}
                    className="not-found-link__big"
                  >
                    <img src={foundRing} alt="Not found number 0" />
                  </Link>

                  <Link
                    to={routing().diamondsFeed}
                    className="not-found-link__small"
                  >
                    <img src={foundDiamond} alt="Not found link small" />
                  </Link>
                </div>
                <img
                  className="not-found__number"
                  src={notFoundNumber}
                  alt="Not found number 4(last one)"
                />
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="not-found-text">
                    <p className="info-p info-p--type2">
                      Sorry! There seems to be a little glitch with this link. This page might not exist but there will always be diamonds. Head back to our homepage to see our designs and to continue shopping.
                    </p>
                  </div>
                  <div className="not-found-link">
                    <Link
                      to={routing().root}
                      className="theme-btn theme-btn--type2"
                    >
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
