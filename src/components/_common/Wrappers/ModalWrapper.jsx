import React from "react";
import CloseSvg from "../../../img/jsSvg/CloseSvg";

export default class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

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
    const { children, handleModal, className = 'cust-modal--reg' } = this.props;
    return (
      <div className="modal-wrapper active" ref={this.wrapper}>
        <div className="modal-wrapper__inner">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-6 col-xl-5">
                <div className={`theme-modal cust-modal ${className}`}>
                  <button
                    className="close-nav close-nav--type2"
                    onClick={handleModal}
                  >
                    <CloseSvg />
                  </button>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
