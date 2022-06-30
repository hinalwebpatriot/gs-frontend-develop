import React from "react";

import BuyArrowSvg from "../../../../img/jsSvg/BuyArrowSvg";
import ErrorValidationBlock from "../../../_common/ErrorValidationBlock";
import selectors from "../../../_selectors/deliverySelectors";
import { pushDeliveryData } from "../DeliveryActions";
import { connect } from "react-redux";
import { PreloaderImg } from "../../../_common/Preloader";

const DeliverySendBlock = ({ pushDeliveryData, errors, status, push }) => (
  <div className="col-lg-6">
    <div className="cart-right-block">
      <ErrorValidationBlock errors={errors} />
      <div className="cart-actions cart-actions--type2">
        <button
          className="buy-btn"
          onClick={() => pushDeliveryData({ push })}
          disabled={status === "request"}
        >
          <span className="buy-btn__text">Secure payment</span>
          <span className="buy-btn__arrow">
            {status === "request" ? (
              <PreloaderImg height="30px" margin="6px auto" />
            ) : (
              <BuyArrowSvg />
            )}
          </span>
        </button>
        {/*<div className="paypal-btn" type="button" disabled>*/}
          {/*<span className="paypal-btn__inner">*/}
            {/*<img src={paypalImg} alt="" />*/}
          {/*</span>*/}
        {/*</div>*/}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  status: selectors.status(state),
  errors: selectors.flattenErrors(state)
});

const mapDispatchToProps = {
  pushDeliveryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliverySendBlock);
