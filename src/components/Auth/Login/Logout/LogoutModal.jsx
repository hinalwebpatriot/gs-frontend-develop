import React from "react";
import ModalWrapper from "../../../_common/Wrappers/ModalWrapper";
import ReactDOM from 'react-dom';

export default class LogoutModal extends React.Component {
  handleLogout = () => {
    this.props.pushLogout({ handleModal: this.props.handleModal });
  };

  render() {
    const { handleModal } = this.props;
    const template = (
      <ModalWrapper handleModal={handleModal}>
        {/*<p className="cust-modal__title cust-modal__title--type2">Logout</p>*/}
        <div className="cred-form">
          <div className="cred-btn">
            <button
              className="theme-btn theme-btn--type2 theme-btn--full-width"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </ModalWrapper>
    );

    return ReactDOM.createPortal(template, document.getElementById("root"));
  }
}
