import React, { Fragment } from "react";
import PaymentSecureCard from "./PaymentSecureCard";
import { Preloader } from "../../../_common/Preloader";
import PaymentMethodPaypalConfirm from './Paypal/PaymentMethodPaypalConfirm';
import PaymentMethodAdyenConfirm from './Adyen/PaymentMethodAdyenConfirm';
import PaymentMethodAlipayConfirm from "./Alipay/PaymentMethodAlipayConfirm";

export default class PaymentMethodConfirm extends React.Component {
  render() {
    const { handleSubmit, data, status, method, orderData, replace } = this.props;
    const { id } = this.props.method;

    return (
      <div className="cart-right-block cart-right-block--type2">
        <p className="theme-subtitle theme-subtitle--medium">
          One step away from perfect gift
        </p>
        <PaymentSecureCard />

        {status === 'success' ? (
          <Fragment>
            {
              id === 1 && (
                <PaymentMethodPaypalConfirm
                  method={method}
                  data={data}
                />
              )
            }

            {
              id === 2 && (
                <PaymentMethodAdyenConfirm
                  handleSubmit={handleSubmit}
                  method={method}
                  data={data}
                  orderData={orderData}
                  replace={replace}
                />
              )
            }

            {
              id === 5 && (
                <PaymentMethodAlipayConfirm
                  method={method}
                  data={data}
                />
              )
            }
          </Fragment>
        ) : <Preloader/> }

      </div>
    );
  }
}
