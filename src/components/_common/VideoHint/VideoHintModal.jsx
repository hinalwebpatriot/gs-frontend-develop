import React from "react";
import ReactDOM from "react-dom";
import closeSvg from "../../../img/svg/close_f.svg";
import { isServer } from "../../../utils/isServer";
import YouTubeLazyLoad from '../YouTube/YouTubeLazyLoad';

export default class VideoHintModal extends React.Component {
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
    const { title, videoId } = this.props;
    const template = (
      <div className="modal-wrapper active" ref={this.wrapper}>
        <div className="modal-wrapper__inner">
          <div className="container">
            <div className="theme-modal cust-modal">
              <button
                className="close-nav close-nav--inner"
                onClick={this.rawCloseModal}
              >
                <img src={closeSvg} alt="" />
              </button>
              <p className="cust-modal__title text-center">{title}</p>
              <div className="row">
                <div className="col">
                  <YouTubeLazyLoad containerClassName="video-guide" videoId={videoId} />
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
