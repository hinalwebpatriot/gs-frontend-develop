import React from 'react';
import ImageLoader from '../../_common/ImageLoader';
import ImageLoaderAdaptive from '../../_common/ImageLoaderAdaptive';
import { get } from 'lodash';
import localeStore from '../../../config/LocalesStore';
import CartProductActions from '../Cart/Items/CartProductActions';
import { Link } from 'react-router-dom';
import routing from '../../../config/routing';
import { getInscriptionStorage } from '../../Product/Engraving/methods';
import { isServer } from '../../../utils/isServer';

const CartProduct = ({ data, showActions, list, position, currentMethodName }) => {
  const { preview_image, image, sku, title, id, h1 } = data;

  let link = routing({ id, slug: h1 }).catalogProduct;

  const priceWithDiscount = get(data, 'price.count', '') - get(data, 'price.count', '') * 0.01;
  const isBankTransfer = currentMethodName === 'Bank transfer';
  const localPrice = isBankTransfer
    ? !isServer && localeStore.formatPrice(priceWithDiscount, get(data, 'price.currency', ''))
    : !isServer && localeStore.formatPrice(get(data, 'price.count', ''), get(data, 'price.currency', ''));
  return (
    <div className="cart-product">
      <div className="scale-img cart-product__img">
        <Link to={link}>
          {image ? (
            <ImageLoaderAdaptive
              product={data}
              list={list}
              position={position}
              mobile={{
                webp: image && image.webp['280x280'],
                jpg: image && image.jpg['280x280']
              }}
              desktop={{
                webp: image && image.webp['225x225'],
                webp2x: image && image.webp['450X450'],
                jpg: image && image.jpg['225x225'],
                jpg2x: image && image.jpg['450x450'],
                width: '186'
              }}
              src={image.origin}
              preloadStyles={{ height: "186px" }}
              alt={title}
            />
          ) : (
            <ImageLoader src={get(preview_image, 'path.medium', '')} product={data} list={list} position={position} />
          )}
        </Link>
      </div>
      <div className="slide cart-product__info">
        <p className="slide__name">{title}</p>
        <p className="slide__code">SKU {sku}</p>
        <div className="cart-prod-option">
          <p>Metal: </p>
          <span>{get(data, 'options.metal.title', '-')}</span>
        </div>
        <div className="cart-prod-option">
          <p>Band Width: </p>
          <span>
            {get(data, 'options.band_width.count', '-')} {get(data, 'options.band_width.dimension', '-')}
          </span>
        </div>
        <div className="cart-prod-option">
          <p>Engraving: </p>
          <span>{(!isServer && getInscriptionStorage(data.id)) || '-'}</span>
        </div>
        <div className="cart-prod-total">
          <p className="cart-prod-total__title">Total:</p>
          <p className="table-price table-price--type3 " style={{ color: '#000000' }}>
            {localPrice}
            <span>{!isServer && localeStore.taxString}</span>
          </p>
          <p className="table-price  table-price--type2">
            {!isServer && localeStore.formatPrice(get(data, 'price.old_count', ''), get(data, 'price.currency', ''))}
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

export default CartProduct;
