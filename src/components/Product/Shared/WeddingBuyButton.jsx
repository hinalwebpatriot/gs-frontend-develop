import React from "react";
import { addToCart } from "../../Checkout/Cart/CartActions";
import { connect } from "react-redux";
import buy3 from "../../../img/svg/buy3.svg";
import BuyArrowSvg from "../../../img/jsSvg/BuyArrowSvg";
import GoogleEE from '../../_common/GoogleEE/GoogleEE';

const WeddingBuyButton = ({ id, selectedSize, addToCart, product }) => (
  <div className="prod-buy">
    <button
      className="buy-btn"
      onClick={() => {
        addToCart({ id, type: "wedding", ringSize: selectedSize.slug });
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
);

const mapStateToProps = (state, props) => ({
  id: props.id,
  product: props.product,
  selectedSize: props.selectedSize
});

const mapDispatchToProps = {
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeddingBuyButton);
