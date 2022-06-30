import React from "react";
import WeddingSlider from "./WeddingSlider";
import { connect } from "react-redux";
import selectors from "../../../_selectors/weddingProductSelectors";

const SimilarCollectionsSlider = ({ id, size, isMobile, status, data }) => (
  <WeddingSlider
    title="Similar collections"
    size={size}
    isMobile={isMobile}
    status={status}
    data={data}
  />
);

const mapStateToProps = (state, props) => ({
  ...props,
  status: selectors.similarCollectionsStatus(state),
  data: selectors.similarCollectionsData(state)
});

export default connect(mapStateToProps)(SimilarCollectionsSlider);
