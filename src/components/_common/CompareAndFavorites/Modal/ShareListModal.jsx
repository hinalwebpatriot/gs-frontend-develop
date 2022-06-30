import React from "react";
import closeSvg from "../../../../img/svg/close_f.svg";
import routing from "../../../../config/routing";
import api from "../../../../config/api";
import { emailValidation } from "../../../../utils/validation";
import TextInputField from "../../TextInputField";
import { PreloaderImg } from "../../Preloader";
import notification from "../../../../utils/notification";
import localeStore from "../../../../config/LocalesStore";

export default class ShareListModal extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
    this.email = React.createRef();

    this.state = {
      status: "none",
      isValid: "none",
      errors: {}
    };
  }

  handleSend = () => {
    const { productType, listType, handleModal } = this.props;

    const email = this.email.current.value;

    const errors = emailValidation({ email });
    const isValid = !Object.keys(errors).length;

    if (isValid) {
      let apiUrl;
      let link;

      const basename =
        localeStore.localeCode !== "en" ? localeStore.localeCode : "";

      switch (listType) {
        case "favorite":
          link = `${basename}${
            routing({ tab: productType, id: "" }).favoriteShare
          }`;
          break;
        case "compare":
          link = `${basename}${
            routing({ tab: productType, id: "" }).compareShare
          }`;
          break;
          default:
            break;
      }

      switch (productType) {
        case "diamond":
          apiUrl = api[listType].shareDiamonds;
          break;
        case "engagement":
          apiUrl = api[listType].shareEngagementRings;
          break;
        case "wedding":
          apiUrl = api[listType].shareWeddingRings;
          break;
          default:
            break;
      }

      this.setState({ status: "request" });

      apiUrl({ email, share_path: link })
        .then(res => {
          notification("success", res.data.message);
          this.setState({
            status: "success"
          });

          handleModal();
        })
        .catch(err => {
          this.setState({
            status: "failure"
          });

          if (err.response) {
            notification("error", err.response.data.message);
          }
        });
    }

    this.setState({
      isValid,
      errors
    });
  };

  componentDidMount() {
    this.wrapper.current.addEventListener("click", this.closeModalHandler);
  }

  componentWillUnmount() {
    this.wrapper.current.removeEventListener("click", this.closeModalHandler);
  }

  closeModalHandler = ({ target }) => {
    if (!target.closest(".theme-modal")) {
      this.props.handleModal();
    }
  };

  render() {
    const { status, isValid, errors } = this.state;
    const { handleModal } = this.props;
    const isDisabled = status === "request";
    return (
      <div className="modal-wrapper active" ref={this.wrapper}>
        <div className="modal-wrapper__inner">
          <div className="container">
            <div className="theme-modal cust-modal theme-modal--send-images ">
              <button
                className="close-nav close-nav--inner"
                onClick={handleModal}
              >
                <img src={closeSvg} alt="close icon" />
              </button>
              <p className="cust-modal__title cust-modal__title--type2">
                Send this list
              </p>
              <div className="send-additional">
                <TextInputField
                  className="form-item form-item--btn-right"
                  type="text"
                  name="email"
                  label="Email"
                  forwardRef={this.email}
                  error={errors.email}
                  isValid={isValid}
                  disabled={isDisabled}
                >
                  <button
                    type="button"
                    className="theme-btn theme-btn--type2 theme-btn--send"
                    onClick={this.handleSend}
                    disabled={isDisabled}
                  >
                    {isDisabled ? (
                      <PreloaderImg height="25px" margin="0 auto" />
                    ) : (
                      "Send"
                    )}
                  </button>
                </TextInputField>
                {/*<div className="field">*/}
                {/*<span className="field-label">Email</span>*/}
                {/*<div className="field-wrap">*/}
                {/*<input type="text" className="form-item form-item--btn-right" />*/}
                {/*<button className="theme-btn theme-btn--type2 theme-btn--send">Send</button>*/}
                {/*</div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
