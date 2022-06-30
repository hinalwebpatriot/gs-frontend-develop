import React from "react";

const CheckoutHeader = ({ push, title }) => (
  <div className="d-flex cart-header cart-header--type2 cart-header--sm-hide">
    <p className="section-title cart-header__title">{title}</p>
    {/*<button className="back-btn" onClick={() => push(routing().cart)}>*/}
    {/*<span className="back-btn__arrow">*/}
    {/*<img src={slideArrow} alt="" />*/}
    {/*</span>*/}
    {/*Back to cart*/}
    {/*</button>*/}
  </div>
);

export default CheckoutHeader;
