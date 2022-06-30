import React, { Fragment } from "react";
import { get } from "lodash"
import { removeAllInscriptionsStorage } from "../../../../Product/Engraving/methods";

export default class PaymentMethodAlipayConfirm extends React.Component {
  render() {
    const { data } = this.props;
    const { name } = this.props.method;
    return (
      <Fragment>
        <div className="choose-payment fill-card">
          <p className="theme-subtitle theme-subtitle--medium">{name}</p>
          {/*<p className="card-data__text">{description}</p>*/}
        </div>
        <div className="cart-actions">
          <a
            href={get(data, 'payment_url', '')}
            rel="noopener noreferrer"
            target="_blank"
            className="theme-btn theme-btn--type2"
            onClick={removeAllInscriptionsStorage()}
          >
            Submit
          </a>
        </div>
      </Fragment>
    )
  }
}
