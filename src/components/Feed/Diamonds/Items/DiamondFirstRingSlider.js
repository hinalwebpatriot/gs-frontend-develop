import React from "react";
import DiamondRingSlider from "./StaticBlocks/DiamondRingSlider";
import { connect } from 'react-redux';
import { getDiamondsFeedFirstRingSlider } from '../../../_selectors/diamondsFeedSelectors';
import { deviceSelector } from '../../../_selectors/deviceSelector';
import { fetchDiamondsFirstRingSlider } from '../DiamondsFeedActions';
import LazyLoadWithServer from "../../../_common/LazyLoadWithServer";

const mapStateToProps = state => {
  const { status, data } = getDiamondsFeedFirstRingSlider(state);

  return {
    status,
    data,
    isMobile: deviceSelector(state)
  }
}

const mapDispatchToProps = {
  fetchData: fetchDiamondsFirstRingSlider
}

const DiamondFirstRingSlider = ({ data, status, isMobile, fetchData }) => {
  return (
    <LazyLoadWithServer height="359px" offset={100} once forceLoad>
      <DiamondRingSlider title="" data={data} status={status} isMobile={isMobile} fetchData={fetchData}  />
    </LazyLoadWithServer>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(DiamondFirstRingSlider);
