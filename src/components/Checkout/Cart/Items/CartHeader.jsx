import React from "react";
import localeStore from "../../../../config/LocalesStore";

const CartHeader = ({ total }) => (
  <div className="d-flex cart-header">
    <p className="cart-header__total">
      Your secure cart total:
      <span> {localeStore.formatPrice(total)}</span>
    </p>
    {/*<a href="#" className="arrow-link arrow-link--type2">*/}
    {/*Continue shopping*/}
    {/*<span className="arrow-link__icon">*/}
    {/*<ArrowFormSvg height="7px" width="13" />*/}
    {/*</span>*/}
    {/*</a>*/}
  </div>
);

export default CartHeader;
