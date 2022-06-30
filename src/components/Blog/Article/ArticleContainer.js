import React from "react";
import { Preloader } from "../../_common/Preloader";
import Article from "./Article";
import selectors from "../../_selectors/blogSelectors";
import { fetchArticle } from "../BlogActions";
import { connect } from "react-redux";
import routing from '../../../config/routing';
import checkForWebCache from "../../../utils/checkForWebCache";

class ArticleContainer extends React.Component {
  componentDidMount() {
    if (!this.props.isFetched && !checkForWebCache()) {
      this.props.fetchData(this.props.match.params.slug);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.props.fetchData(this.props.match.params.slug);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const { isError, isFetched, data } = this.props.data;
    const { seo } = this.props;

    if (isError) {
      this.props.history.replace(routing().notFound);
    }

    if (!isFetched) {
      return <Preloader />;
    }

    return <Article data={data} slug={this.props.match.params.slug} seo={seo} />;
  }
}

const mapStateToProps = (state, props) => ({
  data: selectors.getArticle(state),
  seo: selectors.getSeo(state, props.match.params.page)
});

const clearState = fetchArticle.fulfill;

const mapDispatchToProps = {
  fetchData: fetchArticle,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContainer);
