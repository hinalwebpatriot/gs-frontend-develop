import React from "react";
import { addToCart } from "../../Checkout/Cart/CartActions";
import { connect } from "react-redux";
import buy3 from "../../../img/svg/buy3.svg";
import BuyArrowSvg from "../../../img/jsSvg/BuyArrowSvg";
import GoogleEE from '../../_common/GoogleEE/GoogleEE';

const CatalogBuyButton = ({ id, selectedSize, addToCart, product, isSoldOut }) => {

    const disableBtn = isSoldOut ? 'disable-btn' : '';
    return (
    <div className={`prod-buy ${disableBtn}`}>
      <button
        className="buy-btn"
        disabled={isSoldOut}
        onClick={() => {
            if(isSoldOut) return;
          addToCart({ id, type: "products"});
          GoogleEE.addToCart({ products: [product], quantity: 1 });
        }}
      >
      <span className="buy-btn__icon">
        <img src={buy3} alt="buy icon" />
      </span>
        <span className="buy-btn__text">Add to cart</span>
        <span className="buy-btn__arrow">
        <BuyArrowSvg />
      </span>
      </button>
    </div>
  )
};

const mapStateToProps = (state, props) => {
  return {
    id: props.id,
    product: props.product,
    selectedSize: props.selectedSize
  }
};

const mapDispatchToProps = {
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogBuyButton);
