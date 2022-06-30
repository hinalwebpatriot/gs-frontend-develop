import generateProductData from "./generateProductData";
import { get } from "lodash"
import GoogleEE from './GoogleEE';

export default function trackProductClick({
  product,
  list = "",
  position = 0
}) {

  const currencyCode = get(product, 'price.currency', 'AUD');

  const data = generateProductData(product, { position });

  const event = {
    category: GoogleEE.EVENT_CATEGORY,
    action: GoogleEE.EVENT_ACTION_CLICK
  }

  return { currencyCode, data, event };
}
