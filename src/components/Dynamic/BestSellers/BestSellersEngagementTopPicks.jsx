import React from "react";
import RingListSlider from "../../_common/RingsSlider/RingListSlider";
import withFetch from "../../_common/HOC/WithFetch";
import api from "../../../config/api";

function BestSellersEngagementTopPicks(props) {
    const { data } = props;
    const formattedData = data ? { ...data.data, title: 'Top picks of Engagement rings' } : {};
    return (
      <RingListSlider customCount={4} {...props} type="engagement" data={formattedData} />
    );
}

export default withFetch(api.engagementFeed.getTopPicks)(BestSellersEngagementTopPicks);
