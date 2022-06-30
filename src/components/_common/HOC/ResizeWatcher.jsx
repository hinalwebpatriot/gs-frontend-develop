import React from "react";
import { connect } from "react-redux";
import { deviceChange } from "./ResizeWatcherActions";

class ResizeWatcher extends React.Component {
  constructor(props) {
    super(props);

    this.endPoint = 991; //old 767

    // this.state = {
    //   isMobile: window.innerWidth < this.endPoint,
    //   currentWidth: window.innerWidth
    // };
  }

  componentDidMount() {
    this.props.deviceChange({
      isMobile: window.innerWidth < this.endPoint,
      currentWidth: window.innerWidth
    });
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const isMobile = window.innerWidth < this.endPoint;
    const currentWidth = window.innerWidth;
    // this.setState({
    //   isMobile: isMobile,
    //   currentWidth: currentWidth
    // });

    this.props.deviceChange({
      isMobile: isMobile,
      currentWidth: currentWidth
    });
  };

  render() {
    return null;
  }
}

export default connect(
  null,
  { deviceChange }
)(ResizeWatcher);
