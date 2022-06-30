import React from "react";
import WeddingSlider from "./WeddingSlider";
import { connect } from "react-redux";
import selectors from "../../../_selectors/weddingProductSelectors";

const MoreMetalsSlider = ({ id, size, isMobile, status, data }) => (
  <WeddingSlider
    title="More metals"
    size={size}
    isMobile={isMobile}
    status={status}
    data={data}
  />
);

const mapStateToProps = (state, props) => ({
  ...props,
  status: selectors.moreMetalsStatus(state),
  data: selectors.moreMetalsData(state)
});

export default connect(mapStateToProps)(MoreMetalsSlider);
