import React from "react";
import withFetch from "../../../_common/HOC/WithFetch";
import api from "../../../../config/api";
import SpotlightSlider from "../../Shared/SpotlightSlider";
import LazyLoadWithServer from '../../../_common/LazyLoadWithServer';

const DiamondSpotlightSlider = props => (
  <LazyLoadWithServer height="515px" once offset={50}>
    <SpotlightSlider {...props} />
  </LazyLoadWithServer>
)


export default withFetch(api.diamondsFeed.getPhotoSlider)(
  DiamondSpotlightSlider
);
