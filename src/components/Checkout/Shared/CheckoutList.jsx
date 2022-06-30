import React, { Fragment } from 'react';
import CheckoutDiamond from './CheckoutDiamond';
import CheckoutRing from './CheckoutRing';
import CheckoutProduct from './CheckoutProduct';

// import CheckoutDeliveryTime from './CheckoutDeliveryTime';
import GoogleEE from '../../_common/GoogleEE/GoogleEE';

const CheckoutList = ({ data, showActions = true, showDeliveryDate = true, isExpanded = true, currentMethodName }) => {
  const products = data.items.map((item, index) => {
    switch (item.product_type) {
      case 'diamonds':
        return (
          <CheckoutDiamond
            data={item}
            key={`cart_${item.id}_${item.product_type}`}
            showActions={showActions}
            position={index + 1}
            list={GoogleEE.LIST_CART}
            currentMethodName={currentMethodName}
          />
        );
      case 'products':
        return (
          <CheckoutProduct
            data={item}
            key={`cart_${item.id}_${item.product_type}`}
            showActions={showActions}
            position={index + 1}
            list={GoogleEE.LIST_CART}
            currentMethodName={currentMethodName}
          />
        );
      default:
        return (
          <CheckoutRing
            data={item}
            key={`cart_${item.id}_${item.product_type}`}
            showActions={showActions}
            position={index + 1}
            list={GoogleEE.LIST_CART}
            currentMethodName={currentMethodName}
          />
        );
    }
  });

  return (
    <Fragment>
      <div className="cart-items">{isExpanded && products}</div>
      {/* {showDeliveryDate && data.items.length && <CheckoutDeliveryTime products={data.items}/>} */}
    </Fragment>
  );
};

export default CheckoutList;
