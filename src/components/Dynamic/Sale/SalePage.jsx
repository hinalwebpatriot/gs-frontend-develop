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
              <SaleListContainer/>
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
