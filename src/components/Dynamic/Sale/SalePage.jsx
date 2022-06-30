import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HeadingBlock from '../Shared/HeadingBlock';
import FootingExtraButtons from '../Shared/FootingExtraButtons';
import MetaTags from "../../_common/SEO/MetaTags";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import SaleBanner from './Items/SaleBanner';
import SaleListContainer from './Items/SaleListContainer';
import {fetchStaticPage} from "../../Static/StaticPageActions";
import { setMetaImage } from '../../_common/SEO/SeoActions';
import { dataLayerPush } from '../../../utils/dataLayer';


class SalePage extends Component {
  state = {
    isFetched: true
  };

  componentDidMount() {
    const { fetchStaticPage, setMetaImage } = this.props;
    fetchStaticPage('sale');
    setMetaImage('https://www.gsdiamonds.com.au/static/media/desk_map-img.84fbbd83.png');
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  render() {
    // const { isFetched } = this.state;
    const { data } = this.props;

    return (
      <Fragment>
        <MetaTags page="sale"/>
        <Breadcrumbs marks={[{ title: 'Sale' }]} />
        <HeadingBlock title="Sale items, special Offers and Discounts" />
        <section className="sale-section">
          <div className="container">
            <div className="sale-wrap">
              {data ? <SaleBanner data={data.data}/> : null }
              {/* <SaleListContainer/> */}
              <h6>Terms:  </h6>
              <p>- The offer is available starting from 23 June 2022  00:00  AEST start and ends 7 July 2022  11:59  AEST end , and applies only to purchases made in this period  </p>
              

              <p>- 5% discount applies to all GIA Certified natural diamonds and IGI lab grown certified diamonds bought in-store and online.  </p>

              <p>- Purchase must be paid in full to apply discount.  </p>

              <p>- This promotion will not apply if you refund or cancel an existing order and then place a new order.  </p>

              <p>- 1% bank transfer discount is additionally applicable  </p>

              -Money-back guarantee applied  
              <FootingExtraButtons />
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.staticPages.sale
});

const mapDispatchToProps = {
  fetchStaticPage,
  setMetaImage
};

export default connect(mapStateToProps, mapDispatchToProps)(SalePage);
