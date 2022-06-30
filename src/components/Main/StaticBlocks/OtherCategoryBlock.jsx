import React from "react";

import cat5 from "../../../img/cat5.jpg";
import cat6 from "../../../img/cat6.jpg";
import slideArrow from "../../../img/svg/slide_arrow.svg";

export default class OtherCategoryBlock extends React.Component {
  render() {
    return (
      <section className="main-section">
        <div className="container">
          <div className="home-slider-box product-slider-box">
            <div className="product-container">
              <div className="row justify-content-center">
                <div className="col-lg-4">
                  <div className="slide slide--full ">
                    <div className="slider__img">
                      <img src={cat5} alt="" />
                    </div>
                    <a href="#" aria-label="pendant" className="slide__link">
                      Pendants
                      <span>
                        <img className="slide-arrow" src={slideArrow} alt="" />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="slide slide--full ">
                    <div className="slider__img">
                      <img src={cat6} alt="" />
                    </div>

                    <a href="#" className="slide__link">
                      Preset rings
                      <span>
                        <img className="slide-arrow" src={slideArrow} alt="" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
