import generateProductData from "./generateProductData";
import { get } from "lodash";
import localeStore from "../../../config/LocalesStore";
import GoogleEE from "./GoogleEE";

export default function trackCheckoutSuccess({ order, method }) {
  const { products_list, products_total } = order;

  const currencyCode = get(products_total, "currency", "AUD");
  const price = get(products_total, "count", "0");
  const orderId = get(order, "order_info.Shared.id");
  const tax = localeStore.includeGST ? price - Math.round(price / 1.1) : 0;

  const action = {
    id: orderId,
    affiliation: method,
    revenue: price,
    tax: tax
    // shipping: '0',
  };

  const data = products_list.map(item =>
    generateProductData(item, { quantity: 1 })
  );

  const event = {
    category: GoogleEE.EVENT_CATEGORY,
    action: GoogleEE.EVENT_ACTION_PURCHASE
  };

  return { currencyCode, data, event, action };
}
