import React, { Component, Fragment } from "react";
import HeadingBlock from "../Dynamic/Shared/HeadingBlock";
import EngagementListBody from "./Feed/LandingFeed";
import MetaTags from "../_common/SEO/MetaTags";
import {Redirect, withRouter} from "react-router-dom";
import { flowRight as compose } from "lodash";
import { connect } from "react-redux/";
import { fetchFirstLandingData } from "./LandingActions";
import { Preloader } from "../_common/Preloader";
import routing from "../../config/routing";
import { dataLayerPush } from '../../utils/dataLayer';

class Landing extends Component {
  // state = {
  //   data: []
  // };

  componentDidMount() {
    const { match, fetchFirstLandingData } = this.props;
    const slug = match.params.slug;

    fetchFirstLandingData(slug);
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  };

  render() {
    const { status } = this.props;
    const rings = status === 'success' ? this.props.data.rings : [];
    const diamonds = status === 'success' ? this.props.data.diamonds : [];
    const image = status === 'success' ? this.props.data.image : '';

    if (status === 'error') {
      return <Redirect to={routing().notFound} />
    }

    return (
      <Fragment>
        <MetaTags page="landing" h1="Landing" />
        <HeadingBlock
          title={status === 'success' ? this.props.data.header : ''}
        />
        {
          status === 'success'
            ?
            <EngagementListBody
              rings={rings}
              diamonds={diamonds}
              image={image}
            />
            :
            <Preloader />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ landingData:  { data, status } }) => ({
  data,
  status
});

const mapDispatchToProps = {
  fetchFirstLandingData
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Landing);
