import React from "react";
import ModalWrapper from "../../_common/Wrappers/ModalWrapper";
import ArrowFormSvg from "../../../img/jsSvg/ArrowFormSvg";
import RedArrowSvg from "../../../img/svg/red_arrow.svg";
// import SocialButtons from "../Social/SocialButtons";
import TextInputField from "../../_common/TextInputField";
import LoginModalValidation from "./LoginModalValidation";
import ErrorValidationBlock from "../../_common/ErrorValidationBlock";
import { Preloader } from "../../_common/Preloader";
import ReactDOM from 'react-dom';
// import {pushResendEmail} from "./LoginModalActions";
import api from "../../../config/api";

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();

    this.state = {
      email: null,
      isValid: "none", //none, false, true
      errors: {},
      input: {
        email: "",
        password: ""
      },
      isResendEmail: false,
      resendMessage: null
    };
  }
  componentWillUnmount() {
    this.props.resetState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.status !== this.props.status &&
      this.props.status === "failure"
    ) {
      this.setState({
        isValid: "none"
      });
    }
  }

  handleLogin = () => {
    const email = this.email.current.value;
    const password = this.password.current.value;
    const input = { email, password };

    const { isValid, errors } = LoginModalValidation(input);

    if (isValid) {
      this.props.pushLogin({
        input: input,
        handleModal: this.props.handleModal
      });
    }

    this.setState({
      email,
      isValid,
      errors,
      input,
      resendMessage: null
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleLogin();
    }
  };
  
  handleResendEmail = () => {
    api.auth.resendEmail({email: this.state.email})
      .then(res => this.setState({
        isResendEmail: true,
        resendMessage: res.data.message
      }))
      .catch(e =>  this.setState({
        isResendEmail: false,
        resendMessage: e.response.data.message
      }))
  };

  render() {
    const {
      handleModal,
      handleSignUpModal,
      handleResetModal,
      backendErrors,
      status,
      verify,
      verifyError
    } = this.props;
    const { errors, isValid, isResendEmail, resendMessage } = this.state;
    const verifyText = (verify === 'verify' && verifyError) ? verifyError : null;
    const template = (
      <ModalWrapper handleModal={handleModal}>
        <p className="cust-modal__title cust-modal__title--type2">Sign in</p>

        {status === "request" ? (
          <Preloader />
        ) : (
          <div className="cred-form" onKeyPress={this.handleKeyPress}>
            <ErrorValidationBlock
              errors={errors}
              backendErrors={backendErrors}
              resendMessage={resendMessage}
              isResendEmail={isResendEmail}
              verifyText={verifyText}
              handleResendEmail={this.handleResendEmail}
            />

            <TextInputField
              type="text"
              name="email"
              label="Email"
              forwardRef={this.email}
              error={errors.email}
              isValid={isValid}
            />
            <TextInputField
              type="password"
              name="password"
              label="Password"
              forwardRef={this.password}
              error={errors.password}
              isValid={isValid}
            />
            <div className="cred-btn">
              <button
                type="button"
                className="theme-btn theme-btn--type2 theme-btn--full-width"
                onClick={this.handleLogin}
              >
                Sign in
              </button>
            </div>
            <div className="forgot-pass">
              <span style={{"cursor":"pointer"}} className="cred-extra" onClick={handleResetModal}>
                Forgot password?
                <span>
                  <img className="red-arrow" src={RedArrowSvg} alt="" />
                </span>
              </span>
            </div>
            {/*<SocialButtons type="login" />*/}

            <div className="cred-form__extra">
              <span style={{"cursor":"pointer"}} className="cred-extra" onClick={handleSignUpModal}>
                Registration
                <span>
                  <ArrowFormSvg />
                </span>
              </span>
            </div>
          </div>
        )}
      </ModalWrapper>
    );

    return ReactDOM.createPortal(template, document.getElementById("root"));
  }
}
