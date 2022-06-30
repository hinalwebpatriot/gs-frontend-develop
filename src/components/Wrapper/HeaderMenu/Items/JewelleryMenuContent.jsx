import React from "react";
import FeaturedMenuBlock from "./FeaturedMenuBlock";

import ph6 from "../../../../img/drop_ph6_new_1.jpg";
import ph7 from "../../../../img/drop_ph7_new_1.jpg";
import ph8 from "../../../../img/drop_ph8_new_1.jpg";
import ph9 from "../../../../img/drop_ph9_new_1.jpg";
import ph10 from "../../../../img/drop_ph10_new_1.jpg";
import routing from "../../../../config/routing";
import ImageLoaderWithoutMobile from "../../../_common/ImageLoaderWithoutMobile";


export default class JewelleryMenuContent extends React.Component {
  render() {
    const marks = [
      { title: "Pendant", slug: routing().pendantFeed.slice(1), className: "" },
      { title: "Rings", slug: routing().ringsFeed.slice(1), className: "" },
      { title: "Earrings", slug: routing().earringFeed.slice(1), className: "" },
      { title: "Bracelets", slug: routing().braceletsFeed.slice(1), className: "" },
      { title: "Eternity Rings", slug: routing().eternityRingsFeed.slice(1), className: "" }
    ];
    return (
      <div className="nav-drop">
        <div className="nav-drop__content">
          <FeaturedMenuBlock marks={marks} />
          <FeaturedMenuBlock isMobile={true} marks={marks} />
          <div className="drop-nav">

            <div className="drop-shape">

            </div>
            {/*<div className="drop-btn">*/}
            {/*  <Link to={routing().jewelleryFeed} className="theme-btn">*/}
            {/*    View all jewellery*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </div>
          <div className="drop-gallery sm-hide">
            <div className="gallery-row">
              <div className="col-5 ">
                <div className="gallery-item gallery-item--fh">
                 <ImageLoaderWithoutMobile src={ph6} alt={`Jewellery Content Menu 1`} />
                  {/*<span className="gallery-item__text">Solitaire rings</span>*/}
                </div>
              </div>
              <div className="col-7">
                <div className="gallery-row">
                  <div className="col-6 ">
                    <div className="gallery-item gallery-item--hh">
                      <ImageLoaderWithoutMobile src={ph7} alt={`Jewellery Content Menu 2`} />
                      {/*<span className="gallery-item__text">Gemstone rings</span>*/}
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="gallery-item gallery-item--hh">
                      <ImageLoaderWithoutMobile src={ph8} alt={`Jewellery Content Menu 3`} />
                      {/*<span className="gallery-item__text">Halo rings</span>*/}
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="gallery-item gallery-item--hh">
                      <ImageLoaderWithoutMobile src={ph9} alt={`Jewellery Content Menu 4`} />
                      {/*<span className="gallery-item__text">Three-stone rings</span>*/}
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="gallery-item gallery-item--hh">
                      <ImageLoaderWithoutMobile src={ph10} alt={`Jewellery Content Menu 5`} />
                      {/*<span className="gallery-item__text">Vintage rings</span>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
