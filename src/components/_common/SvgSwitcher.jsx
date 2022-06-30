import React from "react";

export default class SvgSwitcher extends React.Component {
  state = {
    isHover: false
  };

  onMouseEnter = () => {
    this.setState({
      isHover: true
    });
  };
  onMouseLeave = () => {
    this.setState({
      isHover: false
    });
  };

  render() {
    const { link, hoverLink, alt = '' } = this.props;
    const { isHover } = this.state;
    
    return (
      <img
        src={isHover ? hoverLink : link}
        alt={alt}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />
    );
  }
}
