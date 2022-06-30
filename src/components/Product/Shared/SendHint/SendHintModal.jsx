import React from "react";
import CloseSvg from "../../../../img/jsSvg/CloseSvg";
import messengerImg from "../../../../img/svg/contact5.svg";
import whatAppImg from "../../../../img/svg/contact6.svg";
import telegramImg from "../../../../img/svg/contact7.svg";
import SendHintModalValidation from "./SendHintModalValidation";
import { PreloaderImg } from "../../../_common/Preloader";
import api from "../../../../config/api";
import notification from "../../../../utils/notification";
import ErrorValidationBlock from "../../../_common/ErrorValidationBlock";
import { isServer } from "../../../../utils/isServer";
import {
  messengerShareUrl,
  telegramShareUrl,
  whatsAppShareUrl
} from "../../../../utils/sharingUtils";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";

class SendHintModal extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
    this.email = React.createRef();
    this.senderName = React.createRef();
    this.recipientName = React.createRef();
    this.message = React.createRef();

    this.state = {
      status: "none",
      isValid: "none", //none, false, true
      errors: {},
      isEditable: false,
      messageInput: "I dream about this and want you'd definitely want to know."
    };
  }

  handleSend = () => {
    const email = this.email.current.value;
    const senderName = this.senderName.current.value;
    const recipientName = this.recipientName.current.value;
    const message = this.state.messageInput;

    const { isValid, errors } = SendHintModalValidation({
      email,
      senderName,
      recipientName,
      message
    });

    if (isValid) {
      const { link, type, id, handleModal } = this.props;

      this.setState({
        status: "request"
      });

      let typeAdapter = type;

      switch (type) {
        case "engagement":
          typeAdapter = "engagement-rings";
          break;
        case "wedding":
          typeAdapter = "wedding-rings";
          break;
          default:
            break;
      }

      api.shared
        .sendHint({
          recipient_name: recipientName,
          recipient_email: email,
          sender_name: senderName,
          text: message,
          link: link,
          type: typeAdapter,
          id: id
        })
        .then(res => {
          notification("success", res.data.message);
          handleModal();
        })
        .catch(err => {
          this.setState({
            status: "failure",
            errors: {
              other: err.response
                ? err.response.data.message
                : "Something went wrong"
            }
          });
        });
    } else {
      this.setState({
        errors,
        isValid
      });
    }
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

  handleChangeText = () => {
    if (!this.state.isEditable) {
      this.setState(
        {
          isEditable: true
        },
        () => this.message.current.focus()
      );
    }
  };

  handleTextAreaBlur = ({ currentTarget }) => {
    this.setState({
      isEditable: false,
      messageInput: currentTarget.value.trim()
    });
  };

  render() {
    const { handleModal, isMobile } = this.props;
    const { isEditable, messageInput, status, errors } = this.state;

    const isRequest = status === "request";

    const telegramUrl = !isServer
      ? telegramShareUrl({ url: document.URL, title: messageInput })
      : "";
    const whatsAppUrl = !isServer
      ? whatsAppShareUrl({ url: document.URL, title: messageInput })
      : "";
    const messengerUrl = !isServer
      ? messengerShareUrl({ url: document.URL })
      : "";

    return (
      <div className="modal-wrapper active" ref={this.wrapper}>
        <div className="modal-wrapper__inner">
          <div className="container">
            <div className="theme-modal cust-modal theme-modal--hint ">
              <button
                type="button"
                className="close-nav close-nav--inner"
                onClick={handleModal}
              >
                <CloseSvg height="17px" />
              </button>
              <div className="hint-header">
                <p className="theme-subtitle  ">Send a hint</p>
              </div>
              <div className="hint-body">
                <ErrorValidationBlock errors={errors} />
                <div className="hint-user">
                  <p className="hint-user__label">Dear</p>
                  <div className="hint-user__field">
                    <input
                      type="text"
                      maxLength="50"
                      ref={this.recipientName}
                      disabled={isRequest}
                    />
                  </div>
                </div>
                <div
                  className="hint-text"
                  onClick={() => this.handleChangeText(true)}
                >
                  {isEditable ? (
                    <textarea
                      ref={this.message}
                      defaultValue={messageInput}
                      onBlur={this.handleTextAreaBlur}
                      maxLength="255"
                      style={{ width: "100%", height: "50px" }}
                      disabled={isRequest}
                    />
                  ) : (
                    <p>
                      {messageInput.length ? messageInput : "Click to edit"}
                    </p>
                  )}
                </div>
                <div className="hint-user">
                  <p className="hint-user__label">Yours,</p>
                  <div className="hint-user__field">
                    <input
                      type="text"
                      maxLength="50"
                      ref={this.senderName}
                      disabled={isRequest}
                    />
                  </div>
                </div>
                <div className="hint-send-box">
                  <div className="hint-send">
                    <p className="hint-send__label">To</p>
                    <div className="hint-to hint-send__actions">
                      <div className="hint-to__field">
                        <input
                          type="email"
                          maxLength="50"
                          className="form-item"
                          ref={this.email}
                          disabled={isRequest}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="hint-send">
                    <div className="hint-to hint-send__actions">
                      <div className="hint-to__btn">
                        <button
                          type="button"
                          className="theme-btn theme-btn--type2"
                          onClick={this.handleSend}
                          disabled={isRequest}
                        >
                          {isRequest ? <PreloaderImg height="100%" /> : "Send"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hint-options">
                  <p className="hint-options__label">Or send by</p>
                  <div className="hint-options__block">
                    {isMobile && (
                      <a
                        href={messengerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hint-option"
                      >
                        <span className="hint-option__icon">
                          <img src={messengerImg} alt="messenger img" />
                        </span>
                        Messenger
                      </a>
                    )}
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hint-option"
                    >
                      <span className="hint-option__icon">
                        <img src={whatAppImg} alt="whatsApp" />
                      </span>
                      WhatsApp
                    </a>
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hint-option"
                    >
                      <span className="hint-option__icon">
                        <img src={telegramImg} alt="telegram" />
                      </span>
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isMobile: deviceSelector(state),
  ...props
});

export default connect(mapStateToProps)(SendHintModal);
