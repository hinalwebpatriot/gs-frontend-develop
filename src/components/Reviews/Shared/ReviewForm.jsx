import React from "react";
import Rating from "../../_common/Rating";
import TextInputField from "../../_common/TextInputField";
import ReviewFormValidation from "./ReviewFormValidation";
import api from "../../../config/api";
import ReviewFormAttachments from "./ReviewFormAttachments";
import notification from "../../../utils/notification";
import { PreloaderImg } from "../../_common/Preloader";

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.fileCountLimit = 4;
    this.fileSizeLimit = 10485760;

    this.email = React.createRef();
    this.name = React.createRef();
    this.title = React.createRef();
    this.text = React.createRef();
    this.fileInput = React.createRef();

    this.state = {
      isValid: "none", //none, false, true
      status: "none",
      errors: {},
      input: {
        rate: 5,
        images: [] // image = {fileName: '1.jpg', file: file, id: 'id' }
      }
    };
  }

  handleSend = event => {
    if (event) {
      event.preventDefault();
    }

    const email = this.email.current.value;
    const name = this.name.current.value;
    const title = this.title.current.value;
    const text = this.text.current.value;

    const { isValid, errors } = ReviewFormValidation({
      name,
      title,
      text,
      email
    });

    if (isValid) {
      const { type, id, handleForm } = this.props;
      const { rate, images } = this.state.input;
      let productType;

      switch (type) {
        case "engagement":
          productType = "engagement-rings";
          break;
        case "wedding":
          productType = "wedding-rings";
          break;
        case "catalog":
          productType = "products";
          break;
          default:
            break;
      }

      const params = {
        title,
        text,
        rate,
        product_type: productType,
        product_id: id,
        author_name: name,
        author_email: email
      };

      this.setState({
        status: "request"
      });

      const formData = new FormData();

      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });

      if (images.length) {
        images.forEach(item => {
          formData.append("photos[]", item.file, item.fileName);
        });
      }

      api.reviews
        .create(formData)
        .then(() => {
          notification("success", "Review has been sent");
          this.setState(
            {
              status: "success"
            },
            () => handleForm()
          );
        })
        .catch(err => {

          this.setState({
            status: "failure"
          });
        });
    }

    this.setState({
      isValid,
      errors
    });
  };

  handleChangeRate = rate => {
    this.setState({
      ...this.state,
      input: {
        ...this.state.input,
        rate: rate
      }
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSend();
    }
  };

  handleChangeImages = images => {
    this.setState({
      ...this.state,
      input: {
        ...this.state.input,
        images: images
      }
    });
  };

  render() {
    const { errors, input, status, isValid } = this.state;

    const isDisabled = status === "request";

    return (
      <div className="write-review">
        <p className="section-title">Write a Review</p>
        <div className="review-score">
          <p className="review-score__text">Review score</p>
          <div className="d-flex rate-box">
            <Rating
              rate={input.rate}
              handleChange={this.handleChangeRate}
              disabled={isDisabled}
            />
          </div>
        </div>
        <form
          className="review-form"
          onKeyPress={this.handleKeyPress}
          onSubmit={this.handleSend}
        >
          <TextInputField
            type="text"
            name="name"
            label="Name"
            maxLength="255"
            forwardRef={this.name}
            error={errors.name}
            isValid={isValid}
            disabled={isDisabled}
          />
          <TextInputField
            type="email"
            name="email"
            label="Email"
            maxLength="255"
            forwardRef={this.email}
            error={errors.email}
            isValid={isValid}
            disabled={isDisabled}
          />
          <TextInputField
            type="text"
            name="title"
            label="Description"
            maxLength="255"
            forwardRef={this.title}
            error={errors.title}
            isValid={isValid}
            disabled={isDisabled}
          />

          <TextInputField
            type="text"
            name="text"
            label="Comment"
            maxLength="1000"
            forwardRef={this.text}
            error={errors.text}
            isValid={isValid}
            style={{ resize: "vertical" }}
            textArea
            disabled={isDisabled}
          />

          <ReviewFormAttachments
            images={input.images}
            handleChangeImages={this.handleChangeImages}
            fileSizeLimit={this.fileSizeLimit}
            fileCountLimit={this.fileCountLimit}
            forwardRef={this.fileInput}
            disabled={isDisabled}
          />
          <div className="review-form__send">
            <button
              className="theme-btn theme-btn--type2"
              onClick={this.handleSend}
              type="button"
              disabled={isDisabled}
            >
              {isDisabled ? <PreloaderImg height="40px" /> : "Send"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
