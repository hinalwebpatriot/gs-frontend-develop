import React from "react";
import paymentFail from "../../../../img/payment_failed2.png";
import routing from "../../../../config/routing";
import { PreloaderImg } from "../../../_common/Preloader";
import { parsePaymentParams, pushConfirmationPayment } from "../ConfirmationActions";
import selectors from "../../../_selectors/confirmationSelectors";
import { connect } from "react-redux";
import { dataLayerPush } from '../../../../utils/dataLayer';

class ConfirmationFailurePage extends React.Component {
  componentDidMount() {
    const { match, history, parsePaymentParams } = this.props;

    const paymentMethod = match.params.method;
    const paymentParams = history.location.search.slice(1);

    if (paymentMethod === "paypal") {
      parsePaymentParams({
        type: paymentMethod,
        queryString: paymentParams,
        replace: history.replace
      });
    }

    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  handleRedirect = () => {
    this.props.history.push(routing(this.props.id).order);
  };

  render() {
    const { status } = this.props;
    return (
      <section className="cart-section">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8  col-xl-6">
              <div className="d-flex cart-header  cart-header--type3 ">
                <p className="section-title cart-header__title">
                  <span className="failed-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 141.73 141.73"
                    >
                      <path
                        className="cls-1"
                        d="M33.26,72.19c0,4.43,2.69,8,6,8h63.49c3.31,0,6-3.59,6-8s-2.68-8-6-8H39.26C36,64.17,33.26,67.76,33.26,72.19Z"
                      />
                      <path
                        className="cls-1"
                        d="M71,12.07c33.62,0,61,27,61,60.12s-27.35,60.12-61,60.12-61-27-61-60.12S37.38,12.07,71,12.07m0-10c-39.2,0-71,31.4-71,70.12s31.77,70.12,71,70.12,71-31.4,71-70.12S110.2,2.07,71,2.07Z"
                      />
                    </svg>
                  </span>
                  Payment didn't go through
                </p>
              </div>
              <div className="payment-failed">
                <div className="payment-failed__img">
                  <img src={paymentFail} alt="" />
                </div>
                <div className="payment-failed__info">
                  <p className="theme-subtitle theme-subtitle--medium">
                    Possible reasons
                  </p>
                  <p className="info-p info-p--type2 info-p--type2--grey">
                    Check valid card due date
                  </p>
                  <p className="info-p info-p--type2 info-p--type2--grey">
                    Check for sufficient payment amount
                  </p>
                  <p className="info-p info-p--type2 info-p--type2--grey">
                    Check valid card due date
                  </p>
                  {status === "request" && (
                    <div className="payment-failed-btn">
                      <button className="theme-btn theme-btn--type2" disabled>
                        <PreloaderImg height="30px" margin="10px auto" />
                      </button>
                    </div>
                  )}
                  {status === "success" && (
                    <div className="payment-failed-btn">
                      <button
                        className="theme-btn theme-btn--type2"
                        onClick={this.handleRedirect}
                      >
                        Back to payment page
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.orderStatus(state),
  id: selectors.orderId(state)
  // isRouteAllowed: selectors.isRouteAllowed(state),
});

const clearState = pushConfirmationPayment.fulfill;

const mapDispatchToProps = {
  parsePaymentParams,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationFailurePage);
