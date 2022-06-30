import React from "react";
import TextInputField from "../../../_common/TextInputField";
import ErrorValidationBlock from "../../../_common/ErrorValidationBlock";
import api from "../../../../config/api";
import notification from "../../../../utils/notification";
import ChangePasswordPageValidation from './ChangePasswordPageValidation';
import qs from 'qs';
import routing from '../../../../config/routing';
import { PreloaderImg } from '../../../_common/Preloader';
import { dataLayerPush } from '../../../../utils/dataLayer';

export default class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.password = React.createRef();
    this.confirmPassword = React.createRef();

    this.state = {
      status: "none",
      isValid: "none", //none, false, true
      errors: {},
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    const { email } = qs.parse(this.props.location.search.slice(1));

    if (!token || !email) {
      this.props.history.push(routing().root)
    }

    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  handleChangePassword = () => {
    const password = this.password.current.value;
    const confirmPassword = this.confirmPassword.current.value;


    const { isValid, errors } = ChangePasswordPageValidation({ password, confirmPassword });

    if (isValid) {
      this.setState(
        {
          isValid,
          errors
        },
        () => this.handleRequest({ password, confirmPassword })
      );
    } else {
      this.setState({
        isValid,
        errors
      });
    }
  };

  handleRequest = ({ password, confirmPassword }) => {
    const { token } = this.props.match.params;

    const { email } = qs.parse(this.props.location.search.slice(1));

    this.setState({
      status: "request"
    }, () => {
      api.auth.changePassword({
        token: token,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      })
        .then(res => {
          notification('success', 'Your password has been changed');
          this.setState({
            status: 'success'
          }, () => this.props.history.push(routing().root))
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({
              status: 'failure',
              isValid: false,
              errors: {
                token: 'Token expired'
              }
            })
          } else {
            this.setState({
              status: 'failure',
              isValid: false,
              errors: {
                other: err.response.data.message
              }
            })
          }
        })
    });
;
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleResetPassword();
    }

  };

  render() {
    const { status, errors, isValid } = this.state;

    return (
      <div className="restore-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6 col-xl-5">
              <div className="restore-form">
                <p className="restore-form__title">Restore password</p>
                <div className="cred-form" onKeyPress={this.handleKeyPress}>
                  <ErrorValidationBlock
                    errors={errors}
                  />
                  <TextInputField
                    type="password"
                    label="New password"
                    forwardRef={this.password}
                    error={errors.password}
                    isValid={isValid}
                  />
                  <TextInputField
                    type="password"
                    label="Confirm new password"
                    forwardRef={this.confirmPassword}
                    error={errors.confirmPassword}
                    isValid={isValid}
                  />
                  <div className="cred-btn">
                    <button
                      className="theme-btn theme-btn--type2 theme-btn--full-width"
                      onClick={this.handleChangePassword}
                      disabled={status === 'request'}
                    >
                      {status === 'request' ? <PreloaderImg height="55px" width="40px"/> : 'Submit'}
                    </button>
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
