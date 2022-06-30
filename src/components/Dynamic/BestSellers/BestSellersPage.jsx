import React, { Fragment } from 'react';
import HeadingBlock from '../Shared/HeadingBlock';
import BestSellersEngagementTopPicks from './BestSellersEngagementTopPicks';
import BestSellersWeddingTopPicks from './BestSellersWeddingTopPicks';
import BestSellersImageBlock from './BestSellersImageBlock';
import image1 from '../../../img/best_sellers/series_1.jpg'
import image2 from '../../../img/best_sellers/series_2.jpg'
import image3 from '../../../img/best_sellers/series_3.jpg'
import image4 from '../../../img/best_sellers/series_4.jpg'
import FootingExtraButtons from '../Shared/FootingExtraButtons';
import routing from '../../../config/routing';
import MetaTags from "../../_common/SEO/MetaTags";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import { dataLayerPush } from '../../../utils/dataLayer';

export default class BestSellersPage extends React.Component {
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
        <MetaTags page="best-sellers"/>
        <Breadcrumbs marks={[{ title: 'Best Sellers' }]} />
        <HeadingBlock title="Sale items, special Offers and Discounts" />
        <BestSellersImageBlock image={image1} isFirst/>
        <section className="series-section">
          <div className="container">
            <div className="landing-sliders listings-wrap">
              <BestSellersEngagementTopPicks/>
              <BestSellersWeddingTopPicks/>
            </div>
          </div>
          <div className="series-list">
            <BestSellersImageBlock image={image2} link={routing().jewelleryFeed} />
            <BestSellersImageBlock image={image3} link={routing().customJewellery} />
            <BestSellersImageBlock image={image4} link={routing().giftIdeas} />
            <FootingExtraButtons/>
          </div>
        </section>

      </Fragment>
    )
  }
}
