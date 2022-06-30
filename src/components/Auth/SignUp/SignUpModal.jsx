import React from "react";
import ModalWrapper from "../../_common/Wrappers/ModalWrapper";
import ArrowFormSvg from "../../../img/jsSvg/ArrowFormSvg";
// import SocialButtons from "../Social/SocialButtons";
import TextInputField from "../../_common/TextInputField";
import SignUpModalValidation from "./SignUpModalValidation";
import ErrorValidationBlock from "../../_common/ErrorValidationBlock";
import api from "../../../config/api";
import { Preloader } from "../../_common/Preloader";
import formatBackendValidation from "../../../utils/formatBackendValidation";
import notification from "../../../utils/notification";
import RedArrowSvg from "../../../img/svg/red_arrow.svg";
import ReactDOM from 'react-dom';

export default class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();

    this.state = {
      status: "none",
      isValid: "none", //none, false, true
      backendErrors: {},
      errors: {},
      input: {
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  }

  handleSignup = () => {
    const email = this.email.current.value;
    const password = this.password.current.value;
    const confirmPassword = this.confirmPassword.current.value;
    const input = { email, password, confirmPassword };

    const { isValid, errors } = SignUpModalValidation(input);

    if (isValid) {
      this.setState(
        {
          isValid,
          errors,
          input
        },
        () => this.handleRequest({ email, password })
      );
    } else {
      this.setState({
        isValid,
        errors
      });
    }
  };

  handleRequest = payload => {
    this.setState({
      status: "request"
    });
    api.auth
      .signUp(payload)
      .then(res => {
        console.log('then res => ', res);
        if (res.status === 200) {
          this.setState({
            status: "success"
          });
        }
      })
      .catch(e => {
        if (e.response.status === 400) {
          this.setState({
            status: "failure",
            backendErrors: formatBackendValidation(e.response.data.message),
            isValid: "none"
          });
        } else {
          this.setState({
            status: "failure"
          });
          notification("error", e.response.statusText);
        }
      });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSignup();
    }

    if (e.key === "Escape") {
      this.props.handleModal();
    }
  };

  render() {
    const { handleModal, handleLoginModal, handleResetModal } = this.props;
    const { status, errors, isValid, backendErrors, input } = this.state;

    if (status === "success") {
      return (
        <ModalWrapper handleModal={handleModal}>
          <p className="cust-modal__title cust-modal__title--type2">Success</p>
          <div className="cred-form text-center">Your email is not verified.</div>
          <div className="cred-form text-center mb">Check your mail and follow the link from letter to verify your account.</div>
        </ModalWrapper>
      );
    }

    const template = (
      <ModalWrapper handleModal={handleModal}>
        <p className="cust-modal__title cust-modal__title--type2">
          Registration
        </p>

        {status === "request" ? (
          <Preloader />
        ) : (
          <div className="cred-form" onKeyPress={this.handleKeyPress}>
            <ErrorValidationBlock
              errors={errors}
              backendErrors={backendErrors}
            />

            <TextInputField
              type="text"
              name="email"
              label="Email"
              forwardRef={this.email}
              defaultValue={input.email}
              error={errors.email}
              isValid={isValid}
            />
            <TextInputField
              type="password"
              label="Password"
              forwardRef={this.password}
              defaultValue={input.password}
              error={errors.password}
              isValid={isValid}
            />
            <TextInputField
              type="password"
              label="Confirm password"
              forwardRef={this.confirmPassword}
              defaultValue={input.confirmPassword}
              error={errors.confirmPassword}
              isValid={isValid}
            />
            <div className="cred-btn">
              <button
                className="theme-btn theme-btn--type2 theme-btn--full-width"
                onClick={this.handleSignup}
              >
                {/*Sign Up*/}
                Registration
              </button>
            </div>
            <div className="forgot-pass">
              <span style={{"cursor":"pointer"}} className="cred-extra" onClick={handleResetModal}>
                Forgot password?
                <span>
                  <img className="red-arrow" src={RedArrowSvg} alt="red arrow" />
                </span>
              </span>
            </div>
            {/*<SocialButtons type="signup" />*/}

            <div className="cred-form__extra">
              <span style={{"cursor":"pointer"}}  className="cred-extra" onClick={handleLoginModal}>
                I am already registered, sign in
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
