import React, { Fragment } from "react";
import DiamondSimilarSlider from "./StaticBlocks/DiamondSimilarSlider/DiamondSimilarSlider";
import WhyGSDiamondsBlock from "./StaticBlocks/WhyGSDiamondsBlock";
import DiamondCompleteLookBlock from "./StaticBlocks/DiamondCompleteLookBlock";
import DiamondsBlockContainer from "./DiamondBlock/DiamondsBlockContainer";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../../config/routing";
import SubscribeContainer from "../../_common/Subscribe/SubscribeContainer";
import SubscribeBlock from "../../_common/SubscribeBlock/SubscribeBlock";
import RingConstructor from "../../_common/RingConstructor/RingConstructor";
import ConstructorSteps from "../../_common/RingConstructor/ConstructorSteps";
import { connect } from 'react-redux';
import api from "../../../config/api";
import MetaProductTags from "../../_common/SEO/MetaProductTags";
import { dataLayerPush } from '../../../utils/dataLayer';

class DiamondPage extends React.Component {
  state = {
    id: null,
    slug: null,
    data: {},
    isFetched: false,
    isError: false,
    isLayerSent: false,
  };

  componentDidMount() {
    this.parseUrl();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { data, isLayerSent } = this.state;
    if (!isLayerSent && data && data.price) {
      dataLayerPush({
        'dynx_itemid': data.sku,
        'dynx_totalvalue': data.price.count,
        'dynx_pagetype': 'product'
      });
      this.setState({ isLayerSent: true });
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.parseUrl();
    }
  }

  parseUrl = () => {
    const { match, location } = this.props;
    const { slug, id } = match.params;

    // console.log(match, location, "DIAM")

    if (!slug && !id) {
      location.push(routing().notFound);
      return;
    }

    this.setState({
      id,
      slug
    });
    
    this.fetchData(id);
  };

  fetchData = (id) => {
    api.diamond
      .getDiamond(id)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: res.data.data,
            isFetched: true,
            isError: false
          });
        }
      })
      .catch(err => {

        this.setState({
          isFetched: false,
          isError: true
        });
      });
  };

  render() {
    const { id, slug, data, isFetched, isError } = this.state;
    if (!id || !slug) {
      return null;
    }
    const title = data && data.title ? data.title : '';
    const subtitle = data && data.subtitle ? data.subtitle : '';
    const sku = data && data.sku ? data.sku : '';
    return (
      <Fragment>
        <MetaProductTags slug={slug} id={id} h1={title + ' ' + subtitle} h2={`SKU ${sku}`} type="diamonds" />
        <Breadcrumbs
          marks={[
            { title: "Diamonds", path: routing().diamondsFeed },
            { title }
          ]}
        />
        <ConstructorSteps marks={RingConstructor.generateSteps("diamond")} />
        <DiamondsBlockContainer data={data} isFetched={isFetched} isError={isError} {...this.props} id={id} />
        <WhyGSDiamondsBlock />
        <DiamondCompleteLookBlock id={id} />
        <DiamondSimilarSlider id={id} />
        <SubscribeContainer Component={SubscribeBlock} />
      </Fragment>
    );
  }
}

export default connect(
  state => {
    console.log('state', state);
    return {};
  }
)(DiamondPage);