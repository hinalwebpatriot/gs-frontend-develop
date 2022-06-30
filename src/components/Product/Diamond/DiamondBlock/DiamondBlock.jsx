import React from "react";
import ProductGallery from "../../Shared/ProductGallery";
import DiamondDetails from "./DiamondDetails";
import DiamondMain from "./DiamondMain";

// const zoomParams = {
//   minZoom: 1,
//   maxZoom: 10,
//   step: 1,
//   basis: 10,
//   initialZoom: 6
// };

export default class DiamondBlock extends React.Component {
  render() {
    const { data, isMobile } = this.props;
    return (
      <section className="product-main-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <ProductGallery data={data} />
              {!isMobile && <DiamondDetails data={data} isMobile={isMobile} />}
            </div>
            <div className="col-lg-5">
              <DiamondMain data={data} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
