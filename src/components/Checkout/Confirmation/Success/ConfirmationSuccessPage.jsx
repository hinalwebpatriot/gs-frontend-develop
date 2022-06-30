import React from "react";
import CheckoutList from "../../Shared/CheckoutList";
import ConfirmationSuccessHeader from "./ConfirmationSuccessHeader";
import ConfirmationSuccessStatus from "./ConfirmationSuccessStatus";
import ConfirmationSuccessSidebar from "./ConfirmationSuccessSidebar";
import { parsePaymentParams, fetchPaymentOrder, pushConfirmationPayment } from "../ConfirmationActions";
import { connect } from "react-redux";
import selectors from "../../../_selectors/confirmationSelectors";
import { Preloader } from "../../../_common/Preloader";
import { get } from "lodash";
import routing from "../../../../config/routing";
import CheckoutServicesList from "../../CartServices/Items/CheckoutServicesList";
import { dataLayerPush } from '../../../../utils/dataLayer';

class ConfirmationSuccessPage extends React.Component {
  state = {
    method: null
  };

  componentDidMount() {
    const {
      match,
      history,
      parsePaymentParams,
      fetchPaymentOrder
    } = this.props;

    const paymentMethod = match.params.method;
    const paymentParams = history.location.search.slice(1);
    const mappedType = {
      paypal: "Paypal",
      alipay: "Alipay",
      adyen: "Adyen",
      'bank-transfer': "Bank Transfer",
      default: 'default',
    }

    switch (paymentMethod) {
      case "paypal":
        parsePaymentParams({
          type: mappedType[paymentMethod],
          queryString: paymentParams,
          replace: history.replace
        });
        break;
      case "alipay":
      case "adyen":
      case "bank-transfer":
      case "default":
        fetchPaymentOrder({ params: paymentParams, replace: history.replace, type: mappedType[paymentMethod] });
        break;
      default:
        break;
    }

    this.setState({ method: paymentMethod });
  };

  componentDidUpdate() {
    const { status, order, id } = this.props;
    const { info, total } = order;
    if (status === 'success') {
      this.renderScript({
        id,
        email: info.Shared.email,
        country: total.currency
      });
      try {
        dataLayerPush({
          'dynx_itemid': order.items.map(item => item.sku).join(','),
          'dynx_totalvalue': Number(order.total.count),
          'dynx_pagetype': 'conversion'
        });
      } catch (e) {}
      // this.renderGA({
      //   id,
      //   email: info.Shared.email,
      //   country: total.currency,
      //   fn: this.getDoubleDigit
      // });
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  };

  renderScript ({ id, email, country }) {
    const meta = document.createElement("meta");
    meta.name="google-signin-client_id";
    meta.content="%REACT_APP_GOOGLE_ID_OF_WEB_CLIENT%";
    document.head.appendChild(meta);
  };

  getDoubleDigit = (method) => {
    return method.toString().length === 1 ? `0${method}` : method;
  };

  render() {
    const { method } = this.state;
    const { status, order, id } = this.props;
    const { orderType } = order;

    if (status !== "success" || !method) {
      return (
        <section className="cart-section">
          <div className="container">
            <div className="row">
              <div className="col">
                <Preloader margin="40vh auto" />
              </div>
            </div>
          </div>
        </section>
      );
    }

    const isShowroom = Boolean(get(order, 'info.Showroom', false));
    const isBankTransfer = get(order, 'paymentSystem.id', null) === 4;

    if (!order.isPayed && !isShowroom && !isBankTransfer) {
      this.props.history.replace(routing(id).order);
    }

    return (
      <section className="cart-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ConfirmationSuccessHeader
                title={(isBankTransfer || isShowroom) ? `Thanks! You're Awesome!` : 'Payment successful'}
              />
              <div className="order-overview order-overview--first">
                {(!isBankTransfer && !isShowroom) && (
                  <p className="theme-subtitle theme-subtitle--medium">
                    {/*<a className="order-user">*/}
                    {/*{get(order, "info.Shared.first_name", "")}{" "}*/}
                    {/*{get(order, "info.Shared.last_name", "")},*/}
                    {/*</a>{" "}*/}
                    Thank you for your order
                  </p>
                )}

                {isBankTransfer && (
                  <div className="order-overview__email">
                    An invoice has been sent to {' '}
                    <span>{get(order, "info.Shared.email", "")}</span>
                  </div>
                )}
              </div>
              <ConfirmationSuccessStatus id={id} />
              <p className="theme-subtitle theme-subtitle--medium ">
                Order Summary
              </p>
              {
                orderType === 'service' ? <CheckoutServicesList data={order.items} /> : <CheckoutList
                    data={order}
                    showActions={false}
                    showDeliveryDate={false}
                />
              }
              {/*<PaymentOrderData data={order.info} />*/}
            </div>
            <div className="col-lg-6">
              <ConfirmationSuccessSidebar
                total={get(order, "total", {})}
                email={get(order, "info.Shared.email", "")}
                invoice={get(order, 'invoice', null)}
                isAuth={true} //to hide block
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  status: selectors.orderStatus(state),
  order: selectors.orderData(state),
  id: selectors.orderId(state),
  ...props
  // isRouteAllowed: selectors.isRouteAllowed(state),
});


const clearState = pushConfirmationPayment.fulfill;

const mapDispatchToProps = {
  parsePaymentParams,
  fetchPaymentOrder,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationSuccessPage);
