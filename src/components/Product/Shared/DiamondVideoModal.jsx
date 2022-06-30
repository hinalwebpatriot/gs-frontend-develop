import React from "react";
import ReactDOM from "react-dom";
import { isServer } from "../../../utils/isServer";
import CloseSvg from '../../../img/jsSvg/CloseSvg';

export default class DiamondVideoModal extends React.Component {
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

  closeModalHandler = e => {
    if (!e.target.closest(".theme-modal")) {
      this.props.handleModal();
      e.stopPropagation();
    }
  };

  rawCloseModal = e => {
    this.props.handleModal();
    e.stopPropagation();
  };

  render() {
    const { url } = this.props;
    const template = (
      <div className="modal-wrapper active" ref={this.wrapper}>
        <div className="modal-wrapper__inner">
          <div className="container">
            <div className="theme-modal cust-modal">
              <button
                className="close-nav close-nav--type2"
                onClick={this.rawCloseModal}
              >
                <CloseSvg/>
              </button>
              <p className="cust-modal__title diamond-video-modal">Diamond 360</p>
              <div className="row">
                <div className="embed-responsive embed-diamond-video-1 embed-responsive-4by3">
                  <iframe src={url} className="embed-responsive-item"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    if (!isServer) {
      return ReactDOM.createPortal(template, document.getElementById("root"));
    } else {
      return null;
    }
  }
}
