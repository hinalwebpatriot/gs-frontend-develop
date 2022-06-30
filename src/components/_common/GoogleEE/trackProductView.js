import generateProductData from "./generateProductData";
import { get } from "lodash";

export default function trackProductView({
  product,
  products,
  list = "",
  position = 0
}) {

  const currencyCode = get(product, 'price.currency', 'AUD');

  const data = generateProductData(product, { position, list });

  return { currencyCode, data };
}
