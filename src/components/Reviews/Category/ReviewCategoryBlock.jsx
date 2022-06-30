import React, { Fragment } from "react";
import ReviewProduct from "../Shared/ReviewProduct";
import { Preloader } from "../../_common/Preloader";
import routing from "../../../config/routing";

export default class ReviewCategoryBlock extends React.Component {
  render() {
    const { perPage, type, handleNextPage } = this.props;
    const {
      isFetched,
      isNextFetching,
      isError,
      data,
      pagination
    } = this.props.data;

    if (isError) {
      return null;
    }

    if (!isFetched) {
      return (
        <div className="review-container">
          <div className="row">
            <div className="col">
              <Preloader margin="400px auto" />
            </div>
          </div>
        </div>
      );
    }

    if (!data.length) {
      return (
        <div className="review-container">
          <div className="row">
            <p className="text-center">No reviews</p>
          </div>
        </div>
      );
    }

    const reviews = data.map(item => {
      const linkParams = { id: item.product.id, slug: item.product.h1.toLowerCase() };
      const link =
        type === "engagement-category"
          ? routing(linkParams).engagementProduct
          : routing(linkParams).weddingProduct;
      return (
        <ReviewProduct
          data={item}
          key={`review_${type}_${item.id}`}
          link={link}
        />
      );
    });

    return (
      <Fragment>
        {reviews}
        <div className="section-btn">
          {isNextFetching ? (
            <Preloader margin="50px auto" />
          ) : (
            pagination.currentPage < pagination.lastPage && (
              <button
                className="theme-btn"
                onClick={handleNextPage}
                disabled={isNextFetching}
              >
                Next {perPage} Reviews
              </button>
            )
          )}
        </div>
      </Fragment>
    );
  }
}
