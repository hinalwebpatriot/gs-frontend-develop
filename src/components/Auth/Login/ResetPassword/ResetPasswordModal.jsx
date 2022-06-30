import React from "react";
import ModalWrapper from "../../../_common/Wrappers/ModalWrapper";
import TextInputField from "../../../_common/TextInputField";
import ErrorValidationBlock from "../../../_common/ErrorValidationBlock";
import { PreloaderImg } from '../../../_common/Preloader';
import ResetPasswordModalValidation from './ResetPasswordModalValidation';
import api from '../../../../config/api';


export default class ResetPasswordModal extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();

    this.state = {
      isValid: "none", //none, false, true
      status: 'none',
      errors: {},
    };
  }


  handleResetPassword = () => {
    const email = this.email.current.value;

    const { isValid, errors } = ResetPasswordModalValidation({email});

    if (isValid) {
      this.setState({ status: 'request'}, () => {
        api.auth.resetPassword({ email })
          .then(_ => {
            this.setState({ status: 'success'})
          })
          .catch(err => {
            if (err.response.status === 404) {
              this.setState({
                status: 'failure',
                isValid: false,
                errors: {
                  email: 'Email not found'
                }
              })
            } else {
              this.setState({
                status: 'failure',
                isValid: false,
                errors: {
                  email: err.response.data.message
                }
              })
            }
          })
      })

    } else {
      this.setState({
        isValid,
        errors,
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleResetPassword();
    }
  };

  render() {
    const {
      handleModal,
    } = this.props;
    const { errors, isValid, status } = this.state;
    return (
      <ModalWrapper handleModal={handleModal} className="cust-modal--forgot">
        <p className="cust-modal__title cust-modal__title--type2">Forgot password</p>

        {status === "success" ? (
          <div className="cred-form">
            <p className="text-center">Email with reset link has been sent</p>
          </div>
        ) : (
          <div className="cred-form" onKeyPress={this.handleKeyPress}>
            <ErrorValidationBlock
              errors={errors}
            />

            <TextInputField
              type="text"
              name="email"
              label="Email"
              forwardRef={this.email}
              error={errors.email}
              isValid={isValid}
            />
            <div className="cred-btn">
              <button
                type="button"
                className="theme-btn theme-btn--type2 theme-btn--full-width"
                onClick={this.handleResetPassword}
                disabled={status === 'request'}
              >
                {status === 'request' ? <PreloaderImg height="55px" width="40px"/> : 'Submit'}
              </button>
            </div>

          </div>
        )}
      </ModalWrapper>
    );
  }
}
