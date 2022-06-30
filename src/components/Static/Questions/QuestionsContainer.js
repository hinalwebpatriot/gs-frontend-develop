import React from "react";
import routing from "../../../config/routing";
import { Preloader } from "../../_common/Preloader";
import { getStaticPage } from "../../_selectors/staticPagesSelectors";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchQuestionsAndAnswers } from "../StaticPageActions";
import QuestionsPage from "./QuestionsPage";
import { dataLayerPush } from '../../../utils/dataLayer';

class QuestionsContainer extends React.Component {
  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = () => {
    const { data, slug } = this.props;

    if (!data || !data.isFetched || data.isError) {
      this.props.fetchQuestionsAndAnswers(slug);
    }

    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  };

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    if (data && data.isError) {
      return <Redirect to={routing().notFound} />;
    }

    if (!data || !data.isFetched) {
      return <Preloader />
    }

    return <QuestionsPage data={data.data} fullPage={true} />;
  }
}

const mapStateToProps = (state, props) => {
  const slug = "faq";

  return {
    slug: slug,
    data: getStaticPage(state, slug),
    history: props.history
  };
};

export default connect(
  mapStateToProps,
  { fetchQuestionsAndAnswers }
)(QuestionsContainer);
