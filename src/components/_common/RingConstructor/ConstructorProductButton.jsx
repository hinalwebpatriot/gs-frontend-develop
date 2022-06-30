import React from "react";
import buy1 from "../../../img/svg/buy1_1.svg";
import buy2 from "../../../img/svg/buy2.svg";
import BuyArrowSvg from "../../../img/jsSvg/BuyArrowSvg";
import btn_ring from "../../../img/landing/btn_ring.svg";
import { PreloaderImg } from "../Preloader";
import withRingConstructor from "./WithRingConstructor";

const ConstructorProductButton = ({
  type,
  status,
  handleCheck,
  isComplete,
  handleSave,
  isUpdating
}) => {

  const renderBtn = () => {
    switch (type) {
      case "diamond":
        return (
          <button className="buy-btn" onClick={handleSave}>
          <span className="buy-btn__icon">
            <img src={buy1} alt="diamond buy1" />
          </span>
            <span className="buy-btn__text">
            Choose setting
            <span>With this diamond</span>
          </span>
            <span className="buy-btn__arrow">
            <BuyArrowSvg />
          </span>
          </button>
        );
      case "landing":
        return (
          <button
            className="buy-btn"
            onClick={handleSave}
          >
          <span className="buy-btn__icon">
            <img src={btn_ring} alt="landing btn icon" />

          </span>
            <span className="buy-btn__arrow">
            {status === "request" ? (
              <PreloaderImg height="50px" />
            ) : (
              <BuyArrowSvg />
            )}
          </span>
          <span className="buy-btn__text">
            BUY
          </span>
          </button>
        );
      default:
        return (
          <button className="buy-btn" onClick={handleSave}>
          <span className="buy-btn__icon">
            <img src={buy2} alt="buy button default" />
          </span>
            <span className="buy-btn__text">
            Choose diamond
            <span>With this setting</span>
          </span>
            <span className="buy-btn__arrow">
            <BuyArrowSvg />
          </span>
          </button>
        )
    }
  };

  if (isComplete) {
    return (
      <div className="prod-buy">
        <button
          className="buy-btn"
          disabled={status === "request"}
          onClick={handleCheck}
        >
          <span className="buy-btn__icon">
            <img src={buy1} alt="" />
          </span>
          <span className="buy-btn__text">
            {isUpdating ? "Update ring" : "Complete ring"}
          </span>
          <span className="buy-btn__arrow">
            {status === "request" ? (
              <PreloaderImg height="50px" />
            ) : (
              <BuyArrowSvg />
            )}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="prod-buy">
      {renderBtn()}
    </div>
  );
};

export default withRingConstructor(ConstructorProductButton);
