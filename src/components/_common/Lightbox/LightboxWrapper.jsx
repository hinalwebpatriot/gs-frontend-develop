import React from "react";
import loadable from "@loadable/component";

const Lightbox = loadable.lib(() =>
  import(/* webpackChunkName: 'lightbox_lib'*/ "react-image-lightbox")
);

const LightboxWrapper = props => (
  <Lightbox>{({ default: Component }) => <Component {...props} />}</Lightbox>
);

export default LightboxWrapper;
