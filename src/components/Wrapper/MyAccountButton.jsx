import React, { Fragment } from "react";
import { connect } from "react-redux";
import { isAuthSelector } from "../_selectors/authSelectors";
import LoginModalContainer from "../Auth/Login/LoginModalContainer";
import SignUpModal from "../Auth/SignUp/SignUpModal";
import LogoutModal from "../Auth/Login/Logout/LogoutModalContainer";
import ResetPasswordModal from '../Auth/Login/ResetPassword/ResetPasswordModal';

class MyAccountButton extends React.Component {
  state = {
    showLoginModal: false,
    showSignUpModal: false,
    showLogoutModal: false,
    showResetModal: false,
  };

  handleLoginModal = () => {
    this.handleAllModals({
      showLoginModal: !this.state.showLoginModal
    });
  };
  handleLogoutModal = () => {
    this.handleAllModals({
      showLogoutModal: !this.state.showLogoutModal
    });
  };

  handleSignUpModal = () => {
    this.handleAllModals({
      showSignUpModal: !this.state.showSignUpModal
    });
  };

  handleResetModal = () => {
    this.handleAllModals({
      showResetModal: !this.state.showResetModal
    });
  };

  handleAllModals = obj => {
    this.setState({
      showLoginModal: false,
      showSignUpModal: false,
      showLogoutModal: false,
      showResetModal: false,
      ...obj
    });
  };

  render() {
    const { isAuth, className } = this.props;
    const { showLoginModal, showSignUpModal, showLogoutModal, showResetModal } = this.state;
    return (
      <Fragment>
        {showLoginModal && (
          <LoginModalContainer
            handleModal={this.handleLoginModal}
            handleSignUpModal={this.handleSignUpModal}
            handleResetModal={this.handleResetModal}
          />
        )}
        {showSignUpModal && (
          <SignUpModal
            handleModal={this.handleSignUpModal}
            handleLoginModal={this.handleLoginModal}
            handleResetModal={this.handleResetModal}
          />
        )}
        {showLogoutModal && (
          <LogoutModal handleModal={this.handleLogoutModal} />
        )}

        {showResetModal && (
          <ResetPasswordModal handleModal={this.handleResetModal} />
        )}

        <a
          style={{ cursor: "pointer" }}
          className={className}
          onClick={isAuth ? this.handleLogoutModal : this.handleLoginModal}
        >
          My account
        </a>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isAuth: isAuthSelector(state),
  className: props.className
});

export default connect(mapStateToProps)(MyAccountButton);
