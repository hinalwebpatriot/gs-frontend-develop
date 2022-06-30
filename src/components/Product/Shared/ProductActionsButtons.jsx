import React from "react";
import MaleSvg from "../../../img/jsSvg/MaleSvg";
import FavoriteButton from "../../_common/Buttons/FavoriteButton";
import CompareButton from "../../_common/Buttons/CompareButton";
import SendHintButton from "./SendHint/SendHintButton";
import CartButton from "../../_common/Buttons/CartButton";
import CompareAndFavoriteBarContainer from "../../_common/CompareAndFavorites/CompareAndFavoriteBarContainer";

const ProductActionsButtons = ({ type, data, selectedSize, isSoldOut }) => {
  return <div className="product-actions">
    {type === "wedding" ? (
      <button className="prod-action product-actions__item">
        <span className="extra-icon extra-icon--cart">
          <MaleSvg />
        </span>
        <span className="prod-action__text">Choose for him</span>
      </button>
    ) : (
      <CartButton
        className="prod-action product-actions__item prod-action-addToCart"
        type={type}
        id={data.id}
        product={data}
        selectedSize={selectedSize}
        isSoldOut={isSoldOut}
      >
        <span className="prod-action__text">Add to cart</span>
      </CartButton>
    )}

    <CompareButton
      className="prod-action product-actions__item"
      type={type}
      data={data}
    >
      <span className="prod-action__text">Compare</span>
    </CompareButton>
    <CompareAndFavoriteBarContainer type={type} />
    <FavoriteButton
      className="prod-action product-actions__item"
      type={type}
      data={data}
    >
      <span className="prod-action__text">Favourites</span>
    </FavoriteButton>
    <SendHintButton type={type} id={data.id} />
  </div>
};

export default ProductActionsButtons;
