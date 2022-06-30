import React from "react";
import BlogArticlesList from "./BlogArticlesList";
import { Preloader } from "../../_common/Preloader";
import selectors from "../../_selectors/blogSelectors";
import { fetchCategoryArticles } from "../BlogActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import qs from "qs";
import routing from "../../../config/routing";
import { flowRight as compose } from "lodash";

class BlogArticlesListByTagContainer extends React.Component {
  constructor(props) {
    super(props);

    this.perPage = 5;
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    if (!this.props.isFetched) {
      const page = qs.parse(this.props.location.search.slice(1)).page;
      this.props.fetchData({
        slug: this.props.match.params.slug,
        page: page ? page : 1,
        perPage: this.perPage
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      const page = qs.parse(this.props.location.search.slice(1)).page;
      this.props.fetchData({
        slug: this.props.match.params.slug,
        page: page ? page : 1,
        perPage: this.perPage
      });
    }
  }

  handleChangePage = ({ selected }) => {
    const { slug } = this.props.match.params;
    window.scrollTo(
      0,
      this.wrapper.current.getBoundingClientRect().top + window.pageYOffset
    );
    this.props.fetchData({
      slug: this.props.match.params.slug,
      page: selected + 1,
      perPage: this.perPage
    });
    this.props.history.push(routing(`${slug}?page=${selected + 1}`).blogTag);
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
  data: selectors.getArticlesByTagList(state),
  ...props
});

const clearState = fetchCategoryArticles.fulfill;

const mapDispatchToProps = {
  fetchData: fetchCategoryArticles,
  clearState
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BlogArticlesListByTagContainer);
