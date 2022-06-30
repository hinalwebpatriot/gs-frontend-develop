import React, { Component, Fragment } from "react";
import api from '../../config/api';
import HeadingBlock from "../Dynamic/Shared/HeadingBlock";
import EngagementListBody from "./Feed/LandingFeed";
import MetaTags from "../_common/SEO/MetaTags";
import { withRouter } from "react-router-dom";
import {flowRight as compose} from "lodash";
import connect from "react-redux/es/connect/connect";
import { fetchFirstLandingData } from "./LandingActions";
import { Preloader } from "../_common/Preloader";

class LandingBody extends Component {
  state = {
    data: [],
    status: 'none'
  };

  componentDidMount() {
    const { match, fetchFirstLandingData } = this.props;
    const slug = match.params.slug;
    // console.log('slug', slug);

    fetchFirstLandingData();
    api.landing
      .fetchData(slug)
      .then(res => {
        // console.log('!!!',res);
        if (res.status === 200) {
          this.setState({
            data: res.data,
            status: 'success'
          })
        } else {
          this.setState({
            data: [],
            status: 'error'
          })
        }
      }).catch(() => {
      this.setState({
        data: [],
        status: 'error'
      })
    })
  }

  render() {
    const { status } = this.state;
    const rings = status === 'success' ? this.state.data.rings : [];
    const diamonds = status === 'success' ? this.state.data.diamonds : [];
    const image = status === 'success' ? this.state.data.image : '';

    return (
      <Fragment>
        <MetaTags page="landing" h1="Landing" />
        <HeadingBlock
          title={status === 'success' ? this.state.data.header : ''}
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

const mapStateToProps = ({ landingData: { data, status } }) => ({
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
)(LandingBody);
