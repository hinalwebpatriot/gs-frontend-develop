import React from "react";
import DiamondRingSlider from "./StaticBlocks/DiamondRingSlider";
import LazyLoadWithServer from '../../../_common/LazyLoadWithServer';
import { getDiamondsFeedSecondRingSlider } from '../../../_selectors/diamondsFeedSelectors';
import { deviceSelector } from '../../../_selectors/deviceSelector';
import { fetchDiamondsSecondRingSlider } from '../DiamondsFeedActions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { status, data } = getDiamondsFeedSecondRingSlider(state);

  return {
    status,
    data,
    isMobile: deviceSelector(state)
  }
}

const mapDispatchToProps = {
  fetchData: fetchDiamondsSecondRingSlider
}

const DiamondSecondRingSlider = ({ data, status, isMobile, fetchData }) => {
  return (
    <LazyLoadWithServer height="359px" offset={100} once forceLoad>
      <DiamondRingSlider title="" data={data} status={status} isMobile={isMobile} fetchData={fetchData}  />
    </LazyLoadWithServer>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(DiamondSecondRingSlider);

