import React from "react";
import DeliverySendBlock from "./Items/DeliverySendBlock";
import DeliveryForm from "./Items/DeliveryForm";
import { connect } from "react-redux";
import selectors from "../../_selectors/deliverySelectors";
import cartSelectors from "../../_selectors/cartSelectors";
import routing from "../../../config/routing";
import CheckoutHeader from "../Shared/CheckoutHeader";
import { pushDeliveryData } from "./DeliveryActions";
import { dataLayerPush } from '../../../utils/dataLayer';

class DeliveryPage extends React.Component {
  componentDidMount() {
    const { history, isRouteAllowed, data, status } = this.props;
    if (!isRouteAllowed) {
      history.push(routing().cart);
    }
    if (status === 'success' && data.items.length) {
      dataLayerPush({
        'dynx_itemid': data.items.map(item => item.sku).join(','),
        'dynx_totalvalue': data.price,
        'dynx_pagetype': 'cart'
      });
    }
  }

  // componentWillUnmount() {
  //   this.props.clearState();
  // }

  render() {
    const { history } = this.props;
    return (
      <section className="cart-section">
        <div className="container">
          <CheckoutHeader title="Delivery" push={history.push} />
          <div className="row">
            <DeliveryForm />
            <DeliverySendBlock push={history.push} />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isRouteAllowed: selectors.isRouteAllowed(state),
  status: cartSelectors.status(state),
  data: cartSelectors.data(state)
});

const clearState = pushDeliveryData.fulfill;

const mapDispatchToProps = {
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryPage);
