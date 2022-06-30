import React from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import IconFA from "./IconFA";
import { isServer } from "../../utils/isServer";
import { throttle } from "lodash";

export default class ScrollTopButton extends React.Component {
  constructor(props) {
    super(props);

    this.button = React.createRef();

    this.checkVisibility = throttle(this._checkVisibility, 200);
  }

  componentDidMount() {
    document.addEventListener("scroll", this.checkVisibility);
  }

  componentWillUnmount() {
    this.checkVisibility.cancel();
    document.removeEventListener("scroll", this.checkVisibility);
  }

  _checkVisibility = () => {
    if (this.button) {
      if (window.pageYOffset > window.innerHeight) {
        this.button.current.classList.add("active");
      } else {
        this.button.current.classList.remove("active");
      }
    }
  };

  scrollTop = () => {
    window.scrollTo(0, 0)
  }

  render() {
    if (isServer) {
      return null
    }

    return (
      <button aria-label="scroll top" type="button" className="scroll-top-btn" ref={this.button} onClick={this.scrollTop}>
        <IconFA icon={faAngleUp} />
      </button>
    );
  }
}
