import React from "react";
import { connect } from "react-redux";
import RingSlider from "../RingSlider/RingSlider";
// import withFetch from "../../_common/HOC/WithFetch";
// import api from "../../../config/api";

const SuggestedRingsSlider = ({ data, status, isMobile }) => {
  if (status !== "success") {
    return null;
  }

  let adapter = {};

  try {
    adapter = {
      isMobile: isMobile,
      data: data.products["engagement-rings"],
      status: status,
      id: data.data.id,
      title: data.data.title
    };
  } catch {
    adapter = {
      isMobile: false,
      data: [],
      status: "failure",
      id: 0,
      title: ""
    };
  }

  if (!adapter.data.length) {
    return null;
  }

  return <RingSlider {...adapter} />;
};

const mapStateToProps = state => {
  return {
    ...state.main.suggestedRings
  }
}

export default connect(mapStateToProps)(SuggestedRingsSlider)

// export default withFetch(api.main.suggestedRings)(SuggestedRingsSlider);
