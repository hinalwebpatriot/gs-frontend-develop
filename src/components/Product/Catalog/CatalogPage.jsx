import React, { Component, Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import CatalogBlockContainer from "./CatalogBlock/CatalogBlockContainer";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get, flowRight as compose, slice } from "lodash";
import {
  fetchCatalogProduct,
} from "./CatalogPageActions";
import selectors from "../../_selectors/catalogProductSelectors";
import ReviewProductPageContainer from "../../Reviews/Product/ReviewProductPageContainer";
import qs from "qs";
import MetaProductTags from "../../_common/SEO/MetaProductTags";
import { getTextFromUrl } from "../../../utils/getTextFromUrl";
import { dataLayerPush } from '../../../utils/dataLayer';

const availableParams = ["au", "us"];

class CatalogPage extends Component {
  state = {
    isLayerSent: false,
  };

  componentDidMount() {
    if (!this.props.isFetched) {
      const { id } = this.parseUrl();
      this.props.fetchProduct(id);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevUrl = prevProps.location.pathname + prevProps.location.search;
    const thisUrl = this.props.location.pathname + this.props.location.search;
    const { data } = this.props;

    if (prevUrl !== thisUrl) {
      const { id } = this.parseUrl();
      this.props.fetchProduct(id);
    }

    if (!this.state.isLayerSent && data && data.selected && data.selected.id) {
      dataLayerPush({
        'dynx_itemid': data.selected.sku,
        'dynx_totalvalue': data.selected.price.count,
        'dynx_pagetype': 'product'
      });
      this.setState({ isLayerSent: true });
    }
  }

  parseUrl = () => {
    const { match, history, location } = this.props;

    const slug = match.params.slug;
    const id = match.params.id;

    if (!slug || !id) {
      history.push(routing().notFound);
      return;
    }

    const sizeParams = qs.parse(location.search).size;

    const size = availableParams.some(item => item === sizeParams)
      ? sizeParams
      : availableParams[0];

    return {
      slug,
      id,
      size
    };
  };

  render() {
    const { id, slug, size } = this.parseUrl();
    const { data } = this.props;
    if (!id) {
      return null;
    }
    // const sliceCatalog = get(data, "selected.group_sku", "Catalog");
    // const formatCatalogName = sliceCatalog.split('/')[0].charAt(0).toUpperCase() + sliceCatalog.split('/')[0].slice(1);
    const sku = get(data, "selected.sku", 'sku');
    const h1 = get(data, "selected.h1", '');
    const h2 = get(data, "selected.h2", '');
    const bread = getTextFromUrl(slug);

    const formatCatalogName = (JSON.stringify(data) !== "{}" ?  data.selected.category.name : "Category").toLowerCase();
    let catalogTitle = formatCatalogName[0].toUpperCase() + formatCatalogName.slice(1);
    if (catalogTitle === 'Rings') catalogTitle = 'Cluster rings';

    let catalogPath = formatCatalogName;

    if(formatCatalogName === 'rings') {
      catalogPath = 'cluster-rings';
    }
    if(formatCatalogName === 'eternity rings') {
      catalogPath = 'eternity-rings';
    }
    return (
      <>
        <MetaProductTags slug={slug} id={id} h1={h1} h2={`${h2} (${sku})`} type="catalog" />
        <Breadcrumbs
          marks={[
            { title: 'Jewellery', path: '/jewellery' },
            { title: catalogTitle, path: `/jewellery/${catalogPath}` },
            { title: bread }
          ]}
        />
        {/*<ConstructorSteps marks={RingConstructor.generateSteps("engagement")} />*/}
        <CatalogBlockContainer id={id} size={size} />
        <ReviewProductPageContainer id={id} slug={slug} type="catalog" />

        {/*<LazyLoadWithServer height="400px" offset={300}>*/}
          {/*<SuggestDiamondsSlider isMobile={isMobile} id={id}/>*/}
        {/*</LazyLoadWithServer>*/}

        {/*<LazyLoadWithServer height="548px" offset={150}>*/}
          {/*<SuggestRingsSlider isMobile={isMobile} size={size} id={id} />*/}
        {/*</LazyLoadWithServer>*/}

        {/*<LazyLoadWithServer height="431px" offset={150}>*/}
          {/*<YourPicksRingsSlider isMobile={isMobile} size={size} />*/}
        {/*</LazyLoadWithServer>*/}

        {/*<ShapesBlockContainer*/}
          {/*title="Choose an Engagement Ring with GIA certified Diamond"*/}
          {/*page="feed"*/}
        {/*/>*/}
        <SubscribeContainer Component={SubscribeBlock} />
      </>
    );
  }
}

const clearState = fetchCatalogProduct.fulfill;

const mapStateToProps = state => ({
  isMobile: deviceSelector(state),
  isFetched: selectors.catalogData(state).isFetched,
  data: selectors.catalogData(state).data
});

const mapDispatchToProps = {
  clearState,
  fetchProduct: fetchCatalogProduct,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CatalogPage);
