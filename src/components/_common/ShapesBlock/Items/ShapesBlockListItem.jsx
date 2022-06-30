import React from "react";
import ImageLoader from '../../ImageLoader';

const ShapesBlockListItem = ({ id, index, image, title, slug, handleSelect, alt }) => (
  <div className="tab-item" onClick={() => handleSelect(id, slug, index)} data-id={id}>
    <div className="tab-item__img">
      <ImageLoader src={image} alt={alt} importance="high" />
    </div>
    <p className="tab-item__text" data-id={id}>
      {title}
    </p>
  </div>
);
export default ShapesBlockListItem;
