import React from "react";
import DiamondRingSlider from "./StaticBlocks/DiamondRingSlider";
import LazyLoadWithServer from './DiamondSecondRingSlider';
import { connect } from 'react-redux';
import { getDiamondsBannersSlider } from '../../../_selectors/diamondsFeedSelectors';
import { deviceSelector } from '../../../_selectors/deviceSelector';
import { fetchDiamondsBanners } from '../DiamondsFeedActions';

const mapStateToProps = state => {
  const { status, data } = getDiamondsBannersSlider(state);

  return {
    status,
    data,
    isMobile: deviceSelector(state)
  }
};

const mapDispatchToProps = {
  fetchData: fetchDiamondsBanners
};

const DiamondBannersSlider = ({ data, status, isMobile, fetchData }) => {
  return (
    <LazyLoadWithServer height="359px " offset={100} once forceLoad>
      <DiamondRingSlider title="" data={data} status={status} isMobile={isMobile} fetchData={fetchData}  />
    </LazyLoadWithServer>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(DiamondBannersSlider);
