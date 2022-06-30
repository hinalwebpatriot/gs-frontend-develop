import React from "react";
import BlogArticlesList from "./BlogArticlesList";
import { Preloader } from "../../_common/Preloader";
import selectors from "../../_selectors/blogSelectors";
import { fetchArticles } from "../BlogActions";
import { connect } from "react-redux";
import qs from "qs";
import routing from "../../../config/routing";
import { flowRight as compose } from "lodash";
import { withRouter } from "react-router-dom";

class BlogArticlesListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.perPage = 5;
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    if (!this.props.data.isFetched) {
      const page = qs.parse(this.props.location.search.slice(1)).page;

      this.props.fetchData({ page: page ? page : 1, perPage: this.perPage });
    }
  }

  handleChangePage = ({ selected }) => {
    window.scrollTo(
      0,
      this.wrapper.current.getBoundingClientRect().top + window.pageYOffset
    );
    this.props.fetchData({ page: selected + 1, perPage: this.perPage });
    this.props.history.push(routing(`?page=${selected + 1}`).blog);
  };

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const { isError, isFetched, data, pagination } = this.props.data;

    if (isError) {
      return null;
    }

    if (!isFetched) {
      return <Preloader margin="45vh auto" />;
    }

    return (
      <BlogArticlesList
        data={data}
        handleChangePage={this.handleChangePage}
        pagination={pagination}
        forwardRef={this.wrapper}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: selectors.getArticlesList(state),
  ...props
});

const clearState = fetchArticles.fulfill;

const mapDispatchToProps = {
  fetchData: fetchArticles,
  clearState
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BlogArticlesListContainer);
