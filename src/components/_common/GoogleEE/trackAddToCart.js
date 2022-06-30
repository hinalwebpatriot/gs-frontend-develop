import generateProductData from "./generateProductData";
import { get } from "lodash"
import GoogleEE from './GoogleEE';

export default function trackAddToCart({
  products = [],
  quantity = 1
}) {
  const currencyCode = get(products, '[0].price.currency', 'AUD');

  const data = products.map(item => {
    generateProductData(item, { quantity });
  });

  const event = {
    category: GoogleEE.EVENT_CATEGORY,
    action: GoogleEE.EVENT_ACTION_ADD_TO_CART
  };

  return { currencyCode, data, event };
}
