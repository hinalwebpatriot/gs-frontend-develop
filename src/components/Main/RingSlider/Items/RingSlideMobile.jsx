import React from "react";

import ImageLoader from "../../../_common/ImageLoader";

const RingsSlideMobile = ({ item, index, handleSelect }) => (
  <div className="slide slide--full " onClick={() => handleSelect(index)}>
    <div className="slider__img">
      <ImageLoader
        src={item.preview_image ? item.preview_image.path.medium : ""}
        alt=""
      />
    </div>
  </div>
);

export default RingsSlideMobile;
