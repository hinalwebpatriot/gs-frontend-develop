import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { flowRight as compose } from "lodash";
import selectors from "../../_selectors/reviewsSelectors";
import {
  fetchEngagementReviews,
  fetchWeddingReviews,
  fetchWeddingCategoryReviews,
  fetchEngagementCategoryReviews
} from "../ReviewsActions";

/*
Props:
 type: engagement/wedding,
 id: productId,
 slug: productSlug
*/

// const withReviewFetch = params => WrappedComponent => {
//   return
// };

class ReviewWrapperContainer extends React.Component {
  constructor(props) {
    super(props);

    this.perPage = 5;
    this.apiRequest = null;
    this.clearState = null;

    this.handleUpdate(props);
  }

  handleUpdate = props => {
    switch (props.type) {
      case "engagement":
        this.apiRequest = this.props.fetchEngagementReviews;
        this.clearState = this.props.clearEngagementState;
        break;
      case "engagement-category":
        this.apiRequest = this.props.fetchEngagementCategoryReviews;
        this.clearState = this.props.clearEngagementCategoryState;
        break;
      case "wedding":
        this.apiRequest = this.props.fetchWeddingReviews;
        this.clearState = this.props.clearWeddingState;
        break;
      case "wedding-category":
        this.apiRequest = this.props.fetchWeddingCategoryReviews;
        this.clearState = this.props.clearWeddingCategoryState;
        break;
    }
  };

  handleFetch = isNextPage => {
    const { id } = this.props;
    const { currentPage } = this.props.data.pagination;
    this.apiRequest({
      id,
      page: isNextPage ? currentPage + 1 : 1,
      perPage: this.perPage,
      isNextPage: isNextPage
    });
  };

  handleNextPage = () => {
    this.handleFetch(true);
  };

  componentDidMount() {
    if (!this.props.data.isFetched) {
      this.handleFetch();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.type !== this.props.type ||
      prevProps.id !== this.props.id ||
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.handleUpdate(this.props);
      this.handleFetch();
    }
  }

  componentWillUnmount() {
    this.clearState();
  }

  render() {
    const { type, id, slug, data } = this.props;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        handleNextPage: this.handleNextPage,
        perPage: this.perPage,
        type,
        id,
        slug,
        data
      });
    });

    return children;
  }
}

const mapStateToProps = (state, props) => ({
  type: props.type,
  id: props.id,
  slug: props.slug,
  data: selectors.getReviewsList(state, props.type),
  location: props.location,

  children: props.children
});

const clearEngagementState = fetchEngagementReviews.fulfill;
const clearWeddingState = fetchWeddingReviews.fulfill;

const clearEngagementCategoryState = fetchEngagementCategoryReviews.fulfill;
const clearWeddingCategoryState = fetchWeddingCategoryReviews.fulfill;

const mapDispatchToProps = {
  fetchEngagementReviews,
  fetchWeddingReviews,
  fetchWeddingCategoryReviews,
  fetchEngagementCategoryReviews,

  clearEngagementState,
  clearWeddingState,
  clearEngagementCategoryState,
  clearWeddingCategoryState
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ReviewWrapperContainer);
