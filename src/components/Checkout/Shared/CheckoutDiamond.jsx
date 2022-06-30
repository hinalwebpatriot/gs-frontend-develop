import React from 'react';
import ImageLoader from '../../_common/ImageLoader';
import { get } from 'lodash';
import localeStore from '../../../config/LocalesStore';
import CartProductActions from '../Cart/Items/CartProductActions';
import { Link } from 'react-router-dom';
import routing from '../../../config/routing';
import { isServer } from '../../../utils/isServer';

const CartDiamond = ({ data, showActions, position, list, currentMethodName }) => {
  // const {
  //   shape = {},
  //   color = {},
  //   polish = {},
  //   clarity = {},
  //   symmetry = {},
  //   fluorescence = {},
  //   cut = {},
  //   manufacturer = {},
  //   dimensions = '',
  //   depth = '',
  //   carat = '',
  //   table = ''
  // } = data.options;

  const { preview_image, sku, title, subtitle, slug, id } = data;

  const priceWithDiscount = get(data, 'price.count', '') - get(data, 'price.count', '') * 0.01;
  const isBankTransfer = currentMethodName === 'Bank transfer';
  const localPrice = isBankTransfer
    ? !isServer && localeStore.formatPrice(priceWithDiscount, get(data, 'price.currency', ''))
    : !isServer && localeStore.formatPrice(get(data, 'price.count', ''), get(data, 'price.currency', ''));

  return (
    <div className="cart-product">
      <div className="cart-product__img">
        <Link to={routing({ slug, id }).diamondProduct}>
          <ImageLoader src={get(preview_image, 'path.medium', '')} product={data} list={list} position={position} />
        </Link>
      </div>
      <div className="slide cart-product__info">
        <p className="slide__name">
          {title} {subtitle}
        </p>
        <p className="slide__code">SKU {sku}</p>
        <div className="cart-prod-option">
          <p>Color: </p>
          <span>{get(data.options, 'color.title', '')}</span>
        </div>
        <div className="cart-prod-option">
          <p>Cut: </p>
          <span>{get(data.options, 'cut.title', '')}</span>
        </div>
        <div className="cart-prod-option">
          <p>Clarity: </p>
          <span>{get(data.options, 'clarity.title', '')}</span>
        </div>
        <div className="cart-prod-total">
          <p className="cart-prod-total__title">Total:</p>
          <p className="table-price table-price--type3 " style={{ color: '#000000' }}>
            {localPrice}
            <span>{localeStore.taxString.split('.').join('. ')}</span>
          </p>
          <p className="table-price  table-price--type2">
            {localeStore.formatPrice(get(data, 'price.old_count', ''), get(data, 'price.currency', ''))}
          </p>
        </div>
        {isBankTransfer && (
          <div className="cart-prod-discount">
            <p>1% discount applied</p>
          </div>
        )}
      </div>
      {showActions && <CartProductActions data={data} />}
    </div>
  );
};

export default CartDiamond;
