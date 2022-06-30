import React from 'react';
import paypalImg from '../../../img/svg/paypal.svg';
import api from '../../../config/api';
import { get } from "lodash";
import notification from '../../../utils/notification';

export default class CheckoutPaypalButton extends React.Component {
  state = {
    isFetching: false,
    isDone: false,
    link: null
  }

  handleCheckout = () => {
    this.setState({
      isFetching: true
    }, () => {
      api.checkout.createFastPaypalOrder()
        .then(res =>
          api.checkout.proceedPayment({
            order_id: res.data.id,
            paysystem_id: res.data.paysystem_id
          })
        )
        .then(res => {
          this.setState({
            isFetching: false,
            isDone: true,
            link: res.data.payment_url
          }, () => {
            this.handleOpenLink();
          })
        })
        .catch(err => {
          this.setState({
            isFetching: false
          })
          notification('error', get('err.response.data.message', 'Something went wrong'))
        })
    })
  }

  handleOpenLink = () => {
    const { isDone, link } = this.state;

    if (isDone && link) {
      window.open(link, '_blank');
    }
  }

  render() {
    const { isFetching, isDone } = this.state;
    return (
      <button className="paypal-btn" onClick={isDone ? this.handleOpenLink : this.handleCheckout} disabled={isFetching}>
        <span className="paypal-btn__inner">
        {
          isFetching
          ? 'Loading...'
          : <img src={paypalImg} alt=""/>
        }
        </span>
      </button>
    )
  }
}
