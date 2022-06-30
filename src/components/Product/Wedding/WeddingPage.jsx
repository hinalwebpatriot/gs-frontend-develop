import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import WeddingBlockContainer from "./WeddingBlock/WeddingBlockContainer";
import MoreMetalsSlider from "./Sliders/MoreMetalsSlider";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import SimilarCollectionsSlider from "./Sliders/SimilarCollectionsSlider";
import ReviewProductPageContainer from "../../Reviews/Product/ReviewProductPageContainer";
import {
  fetchWeddingRing,
  fetchWeddingRingSimilar,
  fetchWeddingRingMoreMetals
} from "./WeddingPageActions";
import qs from "qs";
import { Redirect } from "react-router-dom";
import selectors from "../../_selectors/weddingProductSelectors";
import { get } from "lodash";
import MetaProductTags from "../../_common/SEO/MetaProductTags";
import { getTextFromUrl } from "../../../utils/getTextFromUrl";
import { dataLayerPush } from '../../../utils/dataLayer';

const availableParams = ["au", "us"];

class WeddingPage extends React.Component {
  state = {
    isLayerSent: false,
  };

  componentDidMount() {
    if (!this.props.isFetched) {
      this.fetchAll();
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
      this.fetchAll();
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

  fetchAll = () => {
    const { id } = this.parseUrl();
    this.props.fetchRing(id);
    this.props.fetchMoreMetals(id);
    this.props.fetchSimilar(id);
  };

  parseUrl = () => {
    const { match, location, history } = this.props;

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
    const { isMobile, data, match } = this.props;

    if (!id) {
      return <Redirect to={routing().notFound} />;
    }

    const sku = get(data, "selected.sku", 'sku');
    const h1 = get(data, "selected.h1", '');
    const h2 = get(data, "selected.h2", '');
    const gender = get(data, "selected.options.gender", "male");

    const genderMark = {
      title: gender === "male" ? "Mens" : "Womens",
      path:
        gender === "male"
          ? routing("mens").weddingFeedWithFilter
          : routing("womens").weddingFeedWithFilter
    };

    return (
      <Fragment>
        <MetaProductTags slug={slug} id={id} h1={h1} h2={`${h2} (${sku})`} type="wedding-rings" />
        <Breadcrumbs
          marks={[
            { title: "Wedding rings", path: routing().weddingFeed },
            genderMark,
            { title: getTextFromUrl(slug) }
          ]}
        />
        <WeddingBlockContainer id={id} size={size} />
        <ReviewProductPageContainer id={id} slug={slug} type="wedding" />
        <MoreMetalsSlider id={id} size={size} isMobile={isMobile} />
        <SimilarCollectionsSlider id={id} size={size} isMobile={isMobile} />
        <SubscribeContainer Component={SubscribeBlock} />
      </Fragment>
    );
  }
}

const clearState = fetchWeddingRing.fulfill;

const mapStateToProps = state => ({
  isMobile: deviceSelector(state),
  isFetched: selectors.ringData(state).isFetched,
  data: selectors.ringData(state).data
});

const mapDispatchToProps = {
  clearState,
  fetchRing: fetchWeddingRing,
  fetchSimilar: fetchWeddingRingSimilar,
  fetchMoreMetals: fetchWeddingRingMoreMetals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeddingPage);
