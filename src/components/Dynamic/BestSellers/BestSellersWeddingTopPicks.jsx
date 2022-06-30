import React from "react";
import RingListSlider from "../../_common/RingsSlider/RingListSlider";
import withFetch from "../../_common/HOC/WithFetch";
import api from "../../../config/api";

function BestSellersWeddingTopPicks(props) {
    const { data } = props;
    const formattedData = data ? { ...data.data, title: 'Top picks of Wedding rings' } : {};
    return (
      <RingListSlider customCount={4} {...props} type="wedding" data={formattedData} />
    );
}

export default withFetch(api.weddingFeed.getTopPicks)(BestSellersWeddingTopPicks);
