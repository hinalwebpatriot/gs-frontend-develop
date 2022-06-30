import React from "react";
import ReviewProduct from "../Shared/ReviewProduct";
import ReviewForm from "../Shared/ReviewForm";
import { Preloader } from "../../_common/Preloader";
import routing from '../../../config/routing';

export default class ReviewProductPage extends React.Component {
  state = {
    showForm: false
  };

  handleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    const { id, perPage, type, handleNextPage, history } = this.props;
    const {
      isFetched,
      isNextFetching,
      isError,
      data,
      pagination
    } = this.props.data;
    const { showForm } = this.state;

    if (isError) {
      history.replace(routing().notFound);
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

    const reviews = data.map(item => (
      <ReviewProduct data={item} key={`review_${item.id}`} />
    ));

    return (
      <div className="review-container">
        <div className="row">
          <div className="col-lg-9">
            {reviews}
            <div className="section-btn">
              {pagination.currentPage < pagination.lastPage && (
                <button
                  className="theme-btn"
                  onClick={handleNextPage}
                  disabled={isNextFetching}
                >
                  Next {perPage} Reviews
                </button>
              )}
              <button
                className="theme-btn theme-btn--type2"
                onClick={this.handleForm}
              >
                Write a review
              </button>
            </div>
            {showForm && (
              <ReviewForm type={type} id={id} handleForm={this.handleForm} />
            )}
            {isNextFetching && <Preloader margin="50px auto" />}
          </div>
        </div>
      </div>
    );
  }
}
