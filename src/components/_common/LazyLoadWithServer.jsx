import React from "react";
import LazyLoad from "react-lazyload";
import { isServer } from "../../utils/isServer";

const LazyLoadWithServer = props => {
  if (props.forceLoad) {
    // ignore lazy load
    return props.children
  }

  if (isServer) {
    if (props.serverPlaceholder) {
      return props.serverPlaceholder;
    }

    return null;
  } else {
    return <LazyLoad once={true} {...props}>{props.children}</LazyLoad>;
  }
};

export default LazyLoadWithServer;
