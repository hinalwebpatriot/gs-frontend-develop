import React from "react";
import { addToCart } from "../../Checkout/Cart/CartActions";
import { connect } from "react-redux";
import CartSvg from "../../../img/jsSvg/CartSvg";
import GoogleEE from '../GoogleEE/GoogleEE';

const CartButton = props => {
  const { type, id, selectedSize, addToCart, className, children, product, isSoldOut } = props;

  let ringSize;

  if (selectedSize) {
    ringSize = selectedSize.slug;
  }

  return (
    <button
      className={className}
      disabled={isSoldOut}
      onClick={() => {
        if(isSoldOut) return;
        addToCart({ id, type, ringSize });
        GoogleEE.addToCart({ products: [product], quantity: 1 })
      }}
    >
      <span className="extra-icon extra-icon--cart">
        <CartSvg />
      </span>
      {children}
    </button>
  );
};

const mapStateToProps = (state, props) => ({
  type: props.type,
  data: props.id,
  size: props.selectedSize,
  className: props.className,
  children: props.children,
  product: props.product,
});

const mapDispatchToProps = {
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartButton);
