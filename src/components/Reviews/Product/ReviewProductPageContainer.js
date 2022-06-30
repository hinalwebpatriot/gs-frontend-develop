import React from "react";
import ReviewProductPage from "./ReviewProductPage";
import { connect } from "react-redux";
import selectors from "../../_selectors/reviewsSelectors";
import {
  fetchEngagementProductReviews,
  fetchWeddingProductReviews,
  fetchCatalogProductReviews,
} from "../ReviewsActions";

/*
Simple version of HOC (withReviewFetch)
Props:
 type: engagement/wedding,
 id: productId,
 slug: productSlug
*/

class ReviewProductPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.apiRequest = null;
    this.clearState = null;

    switch (props.type) {
      case "catalog":
        this.apiRequest = this.props.fetchCatalog;
        this.clearState = this.props.clearCatalogState;
        break;
      case "engagement":
        this.apiRequest = this.props.fetchEngagement;
        this.clearState = this.props.clearEngagementState;
        break;
      case "wedding":
        this.apiRequest = this.props.fetchWedding;
        this.clearState = this.props.clearWeddingState;
        break;
      default: ;
    }
  }

  componentDidMount() {
    if (!this.props.data.isFetched) {
      this.apiRequest({
        id: this.props.id,
        page: 1,
        perPage: 2
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
     if (prevProps.type !== this.props.type || prevProps.id !== this.props.id) {
      this.apiRequest({
        id: this.props.id,
        page: 1,
        perPage: 2
      });
    }
  }

  componentWillUnmount() {
    this.clearState();
  }

  render() {
    return <ReviewProductPage {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  type: props.type,
  id: props.id,
  slug: props.slug,
  data: selectors.getReviewsList(state, `${props.type}-product`)
});

const clearEngagementState = fetchEngagementProductReviews.fulfill;
const clearWeddingState = fetchWeddingProductReviews.fulfill;
const clearCatalogState = fetchCatalogProductReviews.fulfill;

const mapDispatchToProps = {
  fetchWedding: fetchWeddingProductReviews,
  fetchEngagement: fetchEngagementProductReviews,
  fetchCatalog: fetchCatalogProductReviews,

  clearEngagementState,
  clearWeddingState,
  clearCatalogState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewProductPageContainer);
