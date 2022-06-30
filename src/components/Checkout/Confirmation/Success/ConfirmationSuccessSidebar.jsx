import React, { Fragment } from "react";
import localeStore from "../../../../config/LocalesStore";
import TextInputField from "../../../_common/TextInputField";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import SignUpModalValidation from "../../../Auth/SignUp/SignUpModalValidation";
import api from "../../../../config/api";
import formatBackendValidation from "../../../../utils/formatBackendValidation";
import notification from "../../../../utils/notification";
import { PreloaderImg } from "../../../_common/Preloader";
import ErrorValidationBlock from "../../../_common/ErrorValidationBlock";
import { isServer } from '../../../../utils/isServer';

export default class ConfirmationSuccessSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.password = React.createRef();
    this.confirmPassword = React.createRef();

    this.state = {
      status: "none",
      isValid: "none", //none, false, true
      backendErrors: {},
      errors: {}
    };
  }

  handleSignup = () => {
    const email = this.props.email;
    const password = this.password.current.value;
    const confirmPassword = this.confirmPassword.current.value;
    const input = { email, password, confirmPassword };

    const { isValid, errors } = SignUpModalValidation(input);

    if (isValid) {
      this.setState(
        {
          isValid,
          errors
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
      .then(() => {
        this.setState({
          status: "success"
        });
        notification("success", "Check your email");
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

  handlePrint = () => {
    const { invoice } = this.props;
    if (invoice) {
      window.open(invoice, '_blank');
    } else {
      window.print();
    }
  }

  render() {
    const { isAuth, total, invoice } = this.props;
    const { isValid, errors, backendErrors, status } = this.state;
    const isDisabled = status === "request";
    return (
      <div className="cart-right-block cart-right-block--type2">
        <div className="order-to-print">
          <div className="order-review">
            <span className="theme-subtitle order-review__item">
              Order total
            </span>
            <p className="table-price table-price--type3  ">
              {localeStore.formatPrice(total.count, total.currency)}
              <span>{localeStore.taxString.split('.').join('. ')}</span>
            </p>
          </div>
          <button className="theme-btn" onClick={!isServer ? this.handlePrint : undefined }>
            { invoice ? 'Invoice' : 'Print' }
          </button>
        </div>

        {!isAuth && status !== "success" && (
          <Fragment>
            <div className="order-account-info">
              <p className="theme-subtitle">
                Make shopping faster and easier by creating account
              </p>
              {/*<p className="info-p info-p--type2 info-p--type2--grey">*/}
              {/*Enter password to create your account to track your order and view order history.*/}
              {/*</p>*/}
              {/*<p className="info-p info-p--type2 info-p--type2--grey">Faster checkout</p>*/}
              {/*<p className="info-p info-p--type2 info-p--type2--grey">Exclusive products</p>*/}
              {/*<p className="info-p info-p--type2 info-p--type2--grey">Early access to SALE</p>*/}
              {/*<p className="info-p info-p--type2 info-p--type2--grey">Special pricing for all product all year long</p>*/}
            </div>

            <div className="order-acc-form">
              <ErrorValidationBlock
                errors={errors}
                backendErrors={backendErrors}
              />
              <div className="order-acc-form__group">
                <div className="row">
                  <div className="col-md-6">
                    <TextInputField
                      type="password"
                      label="Password"
                      labelClassName="field-label field-label--type2"
                      forwardRef={this.password}
                      error={errors.password}
                      isValid={isValid}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInputField
                      type="password"
                      label="Re-type password"
                      labelClassName="field-label field-label--type2"
                      forwardRef={this.confirmPassword}
                      error={errors.confirmPassword}
                      isValid={isValid}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>
              <div className="form-terms">
                By creating account I agree to{" "}
                <Link to={routing().terms} className="form-terms__link">
                  terms and conditions
                </Link>
              </div>
            </div>
            <div className="cart-actions cart-actions--final-step">
              <button
                className="theme-btn theme-btn--type2"
                onClick={this.handleSignup}
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <PreloaderImg height="30px" margin="21px auto" />
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </Fragment>
        )}

        {/*<div className="order-cancel">*/}
        {/*<p className="theme-subtitle">*/}
        {/*Cancellation process*/}
        {/*</p>*/}
        {/*<p className="info-p info-p--type2 info-p--type2--grey">*/}
        {/*If your details were incorrect, you can cancel order within 15 min in your account*/}
        {/*</p>*/}
        {/*<a href="#" className="arrow-link arrow-link--type2 order-cancel__link">*/}
        {/*Read our terms and conditions*/}
        {/*<span className="arrow-link__icon">*/}
        {/*<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="13"*/}
        {/*height="5" viewBox="0 0 13 5"><defs><path id="d8fwa"*/}
        {/*d="M523.854 714.53c0-.002.003-.005.003-.008l-.001-.022c0-.008.002-.014 0-.022l-.002-.009a.167.167 0 0 0-.01-.028c-.003-.01-.006-.02-.012-.028-.004-.008-.01-.014-.016-.021a.154.154 0 0 0-.023-.023c-.006-.006-.014-.009-.021-.013-.011-.006-.022-.012-.033-.015l-.007-.004c-.003-.001-1.388-.366-2.885-.84-1.489-.464-2.092-1.074-2.453-1.448a.17.17 0 0 0-.24 0 .167.167 0 0 0 0 .239c.51.49 1.076 1.046 2.59 1.53.616.195 1.214.372 1.704.513H511.17a.17.17 0 1 0 0 .338h11.278c-.49.14-1.088.318-1.704.512-1.514.485-2.08 1.04-2.59 1.531a.167.167 0 0 0 0 .238.17.17 0 0 0 .24 0c.36-.373.964-.983 2.453-1.448 1.497-.473 2.882-.838 2.885-.84l.007-.003c.011-.003.022-.009.033-.015.007-.004.015-.007.021-.013a.155.155 0 0 0 .023-.023c.006-.007.012-.013.016-.02.006-.01.01-.02.013-.029a.18.18 0 0 0 .01-.028z"></path></defs><g><g*/}
        {/*transform="translate(-511 -712)"><use fill="#ef4056" xlinkHref="#d8fwa"></use></g></g></svg>*/}
        {/*</span>*/}

        {/*</a>*/}
        {/*</div>*/}
      </div>
    );
  }
}
