import generateProductData from "./generateProductData";
import { get } from "lodash"
import GoogleEE from './GoogleEE';

export default function trackProductDetailsView({ product }) {
  const currencyCode = get(product, 'price.currency', 'AUD');

  const data = generateProductData(product);

  const event = {
    category: GoogleEE.EVENT_CATEGORY,
    action: GoogleEE.EVENT_ACTION_LOG_DETAIL
  }

  return { currencyCode, data, event };
}
