import React from "react";
import RingListSlider from "../../../../_common/RingsSlider/RingListSlider";
import withFetch from "../../../../_common/HOC/WithFetch";
import api from "../../../../../config/api";

class WeddingTopPicks extends React.Component {
  render() {
    const { data } = this.props;
    const formattedData = data ? { ...data.data } : {};
    return (
      <RingListSlider {...this.props} type="wedding" data={formattedData} />
    );
  }
}

export default withFetch(api.weddingFeed.getTopPicks)(WeddingTopPicks);
