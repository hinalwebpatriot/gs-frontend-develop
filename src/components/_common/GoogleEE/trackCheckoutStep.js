import generateProductData from "./generateProductData";
import { get } from "lodash";
import GoogleEE from "./GoogleEE";

export default function trackCheckoutStep({ products = [], step, option }) {
  const currencyCode = get(products, "[0].price.currency", "AUD");

  const data = products.map(item => generateProductData(item, { quantity: 1 }));

  const event = {
    category: GoogleEE.EVENT_CATEGORY,
    action: GoogleEE.EVENT_ACTION_ORDER_STEP
  };

  let action = { step };

  if (option) {
    action.option = option;
  }

  return { currencyCode, data, event, action };
}
