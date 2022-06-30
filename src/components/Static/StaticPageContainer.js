import React from "react";
import { getStaticPage, getSeoFromStaticPage } from "../_selectors/staticPagesSelectors";
import routing from "../../config/routing";
import { Preloader } from "../_common/Preloader";
import StaticPage from "./StaticPage";
import NotFoundPage from "../_common/NotFoundPage";
import { connect } from "react-redux";
import { fetchStaticPage } from "./StaticPageActions";
import { dataLayerPush } from '../../utils/dataLayer';

class StaticPageContainer extends React.Component {
  componentDidMount() {
    this.handleFetch();
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.handleFetch();
    }
  }

  handleFetch = () => {
    const { data, slug, history } = this.props;

    if (!slug) {
      history.push(routing().notFound);
    }

    if (!data || !data.isFetched || data.isError) {
      this.props.fetchStaticPage(slug);
    }
  };

  render() {
    const { data, slug, seo } = this.props;

    if (data && data.isError) {
      return <NotFoundPage />;
    }

    if (!data || !data.isFetched) {
      return <Preloader />;
    }

    return <StaticPage data={data.data} slug={slug} seo={seo} />;
  }
}

const mapStateToProps = (state, props) => {
  const slug = props.match.params.page;
  return {
    slug: slug,
    data: getStaticPage(state, slug),
    history: props.history,
    seo: getSeoFromStaticPage(state, slug)
  };
};

export default connect(
  mapStateToProps,
  { fetchStaticPage }
)(StaticPageContainer);
