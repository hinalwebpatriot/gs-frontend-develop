import React, { Fragment } from "react";
import {get} from "lodash";
import {removeAllInscriptionsStorage} from "../../../../Product/Engraving/methods";

export default class PaymentMethodAdyenConfirm extends React.Component {

  render() {
    const { name, description } = this.props.method;
    const { success, error, submit_button} = this.props.data;

    return (
      <Fragment>
        <div className="choose-payment fill-card">
          <p className="theme-subtitle theme-subtitle--medium">{name}</p>
          <p className="card-data__text">{description}</p>
        </div>
        <div className="choose-payment fill-card">
          <div className="cart-actions">
              {
                  success ? <a
                      href={get(this.props.data, 'payment_url', '')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-btn theme-btn--type2"
                      onClick={removeAllInscriptionsStorage()}
                  >
                      {submit_button}
                  </a> : <span className="theme-btn theme-btn--type2" >{error}</span>
              }
          </div>

        </div>
      </Fragment>
    )
  }
}
