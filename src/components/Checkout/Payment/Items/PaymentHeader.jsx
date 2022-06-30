import React from 'react';
import localeStore from '../../../../config/LocalesStore';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import IconFA from '../../../_common/IconFA';

const PaymentHeader = ({ total, handleToggle, isExpanded = true, isServices = false, currentMethodName }) => {
  const isBankTransfer = currentMethodName === 'Bank transfer';
  const priceWithDiscount = total.count - total.count * 0.01;
  const localPrice = isBankTransfer
    ? localeStore.formatPrice(priceWithDiscount, total.currency)
    : localeStore.formatPrice(total.count, total.currency);

  return (
    <div className="order-review" onClick={handleToggle}>
      <span className="theme-subtitle order-review__item">Order review</span>
      <p className="table-price table-price--type3" style={{ position: 'relative', color: '#000000' }}>
        {localPrice}
        <span>{localeStore.taxString.split('.').join('. ')}</span>
        {isBankTransfer && (
          <p style={{ margin: '0 12px 0 12px', textDecoration: 'line-through', fontWeight: '400' }}>
            {localeStore.formatPrice(total.count, total.currency)}
          </p>
        )}

        {isBankTransfer && (
          <div className="cart-prod-discount payment-header">
            <p>1% discount applied</p>
          </div>
        )}
      </p>

      <span className="xs-show order-review__arrow">
        {!isServices && <IconFA icon={faAngleDown} rotation={isExpanded ? 180 : 0} />}
      </span>
    </div>
  );
};

export default PaymentHeader;
