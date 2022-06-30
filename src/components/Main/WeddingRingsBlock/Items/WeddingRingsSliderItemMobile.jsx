import React from "react";
import { get } from "lodash";

import ImageLoader from "../../../_common/ImageLoader";

const WeddingRingsSliderItemMobile = ({ data, handleSelect, index }) => (
  <div className="slide slide--full" onClick={() => handleSelect(index)}>
    <div className="slider__img">
      <ImageLoader src={get(data, "preview_image.path.thumb", null)} />
    </div>
  </div>
);

export default WeddingRingsSliderItemMobile;
