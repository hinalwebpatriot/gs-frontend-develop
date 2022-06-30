import React from "react";
import { connect } from "react-redux";
import RingSlider from "../RingSlider/RingSlider";
// import withFetch from "../../_common/HOC/WithFetch";
// import api from "../../../config/api";

const AlsoSuggestedRingsSlider = ({ data, status }) => {
  if (status !== "success") {
    return null;
  }

  let adapter = {};

  try {
    adapter = {
      data: data,
      status: status,
      id: "also-suggest",
      title: "We may also suggest"
    };
  } catch {
    adapter = {
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
    ...state.main.alsoSuggestedRings
  }
}

export default connect(mapStateToProps)(AlsoSuggestedRingsSlider)

// export default withFetch(api.main.alsoSuggestedRings)(AlsoSuggestedRingsSlider);
