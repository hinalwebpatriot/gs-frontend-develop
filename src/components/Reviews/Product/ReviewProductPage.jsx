import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import ReviewProduct from "../Shared/ReviewProduct";
import ReviewForm from "../Shared/ReviewForm";

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
    const { id, slug, type } = this.props;
    const { isFetched, isError, data } = this.props.data;

    const { showForm } = this.state;

    if (isError || !isFetched) {
      return null;
    }

    if (!data.length) {
      return (
        <div className="prod-review-section">
          <div className="container">
            <p className="section-title">Reviews</p>
            <div className="review-container text-center">No Reviews</div>
            <div className="section-btn">
              <button className="theme-btn" onClick={this.handleForm}>
                Write a Review
              </button>
            </div>
            {showForm && (
              <ReviewForm type={type} id={id} handleForm={this.handleForm} />
            )}
          </div>
        </div>
      );
    }

    const slicedData = data.slice(0, 2);

    const reviews = slicedData.map(item => (
      <ReviewProduct data={item} key={`review_${item.id}`} />
    ));

    let link;
    switch (type) {
      // case "jewellery":
      case "engagement": {
        link = routing({ id, slug }).engagementProductReview;
        break;
      }
      case "wedding": {
        link = routing({ id, slug }).weddingProductReview;
        break;
      }
      case "catalog": {
        link = routing({ id, slug }).catalogProductReview;
        break;
      }
      default:
        break;
    }

    return (
      <div className="prod-review-section">
        <div className="container">
          <p className="section-title">Reviews</p>
          <div className="review-container">
            <div className="row">
              <div className="col-lg-9">{reviews}</div>
            </div>
          </div>
          <div className="section-btn">
            <button className="theme-btn" onClick={this.handleForm}>
              Write a Review
            </button>
            {
              type !== "catalog" ? <Link to={link} className="theme-btn theme-btn--type2">
                All Reviews
              </Link> : null
            }
          </div>

          {showForm && (
            <ReviewForm type={type} id={id} handleForm={this.handleForm} />
          )}
        </div>
      </div>
    );
  }
}
