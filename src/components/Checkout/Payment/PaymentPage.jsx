import React from 'react';
import jwt from 'jsonwebtoken';
import clientConfig from '../../../config/client.config';
import { connect } from 'react-redux';
import selectors from '../../_selectors/paymentSelectors';
import routing from '../../../config/routing';
import CheckoutHeader from '../Shared/CheckoutHeader';
import CheckoutList from '../Shared/CheckoutList';
import { Preloader } from '../../_common/Preloader';
import PaymentHeader from './Items/PaymentHeader';
import CheckoutOrderData from '../Shared/CheckoutOrderData';
import PaymentMethodContainer from './Items/PaymentMethodContainer';
import { fetchOrderData } from './PaymentActions';
import { deviceSelector } from '../../_selectors/deviceSelector';
import { dataLayerPush } from '../../../utils/dataLayer';

import CheckoutDeliveryTime from '../Shared/CheckoutDeliveryTime';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);

    this.id = undefined;

    this.state = {
      isExpanded: false
    };
  }

  handleToggle = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };

  componentDidMount() {
    const { fetchOrderData, history } = this.props;
    try {
      const decoded = jwt.verify(this.props.match.params.id, clientConfig.orderSecret.key);
      this.id = Number(decoded);
      fetchOrderData({ id: this.id, replace: history.replace });
    } catch (err) {
      history.replace('/');
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.status === 'request' && this.props.status === 'success') {
      const { order, history } = this.props;
      if (order.info['Showroom']) {
        history.push(routing(`default?id=${order.info.Shared.id}`).paymentSuccess);
      }
      dataLayerPush({
        'dynx_itemid': order.items.map(item => item.sku).join(','),
        'dynx_totalvalue': Number(order.total.count),
        'dynx_pagetype': 'cart'
      });
    }
  }

  render() {
    const { history, status, order, isMobile, currentMethod } = this.props;
    // const
    const { isExpanded } = this.state;

    if (status === 'request' || status === 'none') {
      return (
        <section className="cart-section">
          <Preloader margin="40vh auto" />
        </section>
      );
    }

    return (
      <section className="cart-section">
        <div className="container">
          <CheckoutHeader title="Payment" push={history.push} />
          <div className="row">
            <div className="col-lg-6">
              <PaymentHeader
                total={order.total}
                handleToggle={this.handleToggle}
                isExpanded={isExpanded}
                currentMethodName={currentMethod && currentMethod.name}
              />
              <p className="theme-subtitle theme-subtitle--medium xs-hide">Your product</p>
              <CheckoutList
                data={order}
                showActions={false}
                isExpanded={isMobile ? isExpanded : undefined}
                currentMethodName={currentMethod && currentMethod.name}
              />
            </div>
            <div className="col-lg-6">
              <PaymentMethodContainer replace={history.replace} />
              <CheckoutDeliveryTime />
            </div>
            <CheckoutOrderData data={order.info} />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  status: selectors.orderStatus(state),
  order: selectors.orderData(state),
  isMobile: deviceSelector(state),
  currentMethod: selectors.currentMethod(state)
  // isRouteAllowed: selectors.isRouteAllowed(state),
});

const clearState = fetchOrderData.fulfill;

const mapDispatchToProps = {
  fetchOrderData,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentPage);
