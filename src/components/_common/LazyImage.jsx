import React from "react";
import LazyLoadWithServer from "./LazyLoadWithServer";

export default class LazyImage extends React.Component {
  render() {
    const { src = "", alt = "", once = true } = this.props;
    return (
      <LazyLoadWithServer once={once}>
        <img src={src} alt={alt} />
      </LazyLoadWithServer>
    );
  }
}
