import React from 'react';
import { connect } from 'react-redux';
import selectors from '../../_selectors/cartSelectors';

function OrderDate({ delivery }) {
  return (
    <p className="order-now__text">
      {delivery && delivery.info} <span>{delivery && delivery.date}</span>
    </p>
  );
}

const CheckoutDeliveryTime = ({ products, delivery }) => {
  return (
    <div className="order-get" style={{ justifyContent: 'center' }}>
      <div className="order-get__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="34"
          height="30"
          viewBox="0 0 34 30"
        >
          <defs>
            <path
              id="j1l4a"
              d="M392 1114.81l4.255-4.31L407 1121.381l10.745-10.881 4.255 4.31-15 15.19zm15 .69l-15-15.19 4.255-4.31L407 1106.881 417.745 1096l4.255 4.31z"
            />
          </defs>
          <g>
            <g transform="rotate(-90 -337 759)">
              <use fill="#ef4056" xlinkHref="#j1l4a" />
            </g>
          </g>
        </svg>
      </div>
      <div className="order-now order-get__info" style={{ width: 'fit-content' }}>
        <p className="theme-subtitle theme-subtitle--smaller order-now__title">Order now to get your order</p>
        <OrderDate delivery={delivery} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  delivery: selectors.delivery(state)
});

export default connect(
  mapStateToProps,
  null
)(CheckoutDeliveryTime);
