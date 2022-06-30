import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import EngagementBlockContainer from "./EngagementBlock/EngagementBlockContainer";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import {
  fetchEngagementRing
} from "./EngagementPageActions";
import selectors from "../../_selectors/engagementProductSelectors";
import YourPicksRingsSlider from "./SuggestRings/YourPicksRingsSlider";
import RingConstructor from "../../_common/RingConstructor/RingConstructor";
import ConstructorSteps from "../../_common/RingConstructor/ConstructorSteps";
import ReviewProductPageContainer from "../../Reviews/Product/ReviewProductPageContainer";
import qs from "qs";
import { get } from "lodash";
import MetaProductTags from "../../_common/SEO/MetaProductTags";
import LazyLoadWithServer from '../../_common/LazyLoadWithServer';
import { getTextFromUrl } from "../../../utils/getTextFromUrl";
import { dataLayerPush } from '../../../utils/dataLayer';

const availableParams = ["au", "us"];

class EngagementPage extends React.Component {
  state = {
    isLayerSent: false,
  };

  componentDidMount() {
    if (!this.props.isFetched) {
      const { id } = this.parseUrl();
      this.props.fetchRing(id);
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
      this.props.fetchRing(id);
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
    const { isMobile, data } = this.props;

    if (!id) {
      return null;
    }

    const sku = get(data, "selected.sku", 'sku');
    const h1 = get(data, "selected.h1", '');
    const h2 = get(data, "selected.h2", '');

    return (
      <Fragment>
        <MetaProductTags slug={slug} id={id} h1={h1} h2={`${h2} (${sku})`} type="engagement-rings" />
        <Breadcrumbs
          marks={[
            { title: "Engagement rings", path: routing().engagementFeed },
            { title: getTextFromUrl(slug) }
          ]}
        />
        <ConstructorSteps marks={RingConstructor.generateSteps("engagement")} />
        <EngagementBlockContainer id={id} size={size} />
        <ReviewProductPageContainer id={id} slug={slug} type="engagement" />

        {/*<LazyLoadWithServer height="400px" offset={300}>*/}
        {/*  <SuggestDiamondsSlider isMobile={isMobile} id={id}/>*/}
        {/*</LazyLoadWithServer>*/}

        {/*<LazyLoadWithServer height="548px" offset={150}>*/}
        {/*  <SuggestRingsSlider isMobile={isMobile} size={size} id={id} />*/}
        {/*</LazyLoadWithServer>*/}

        <LazyLoadWithServer height="431px" offset={150}>
          <YourPicksRingsSlider isMobile={isMobile} size={size} />
        </LazyLoadWithServer>

        <SubscribeContainer Component={SubscribeBlock} />
      </Fragment>
    );
  }
}

const clearState = fetchEngagementRing.fulfill;

const mapStateToProps = state => ({
  isMobile: deviceSelector(state),
  isFetched: selectors.ringData(state).isFetched,
  data: selectors.ringData(state).data
});

const mapDispatchToProps = {
  clearState,
  fetchRing: fetchEngagementRing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EngagementPage);
