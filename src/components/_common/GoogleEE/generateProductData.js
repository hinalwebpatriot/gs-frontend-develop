import { get } from "lodash";

export default function generateProductData(data, additional = {}) {
  const { product_type, title, subtitle, sku, price = {}, options } = data;

  let product = {
    id: sku,
    price: String(get(price, "count", "0")),
    ...additional
  };

  switch (product_type) {
    case "diamonds":
      product.category = "Diamonds";
      product.name = `${title} Diamond`;
      product.variant = get(options, "shape.title", "");
      product.brand = get(options, "manufacturer.title", "");
      break;
    case "engagement-rings":
      product.category = "Engagement rings";
      product.name = `${title}, ${subtitle} Ring`;
      product.variant = get(options, "ring_style.title", "");
      product.brand = "GS Diamonds";
      product.dimension1 = get(options, "metal.title", "");
      product.dimension2 = get(options, "ring_collection.title", "");
      product.dimension3 = get(options, "stone_shape.title", "");
      break;
    case "wedding-rings":
      product.category = "Wedding rings";
      product.name = `${title}, ${subtitle} Ring`;
      product.variant = get(options, "ring_style.title", "");
      product.brand = "GS Diamonds";
      product.dimension1 = get(options, "metal.title", "");
      product.dimension2 = get(options, "ring_collection.title", "");
      break;
    case "products":
      product.category = "Products";
      product.name = `${title}, ${subtitle} Product`;
      product.variant = get(options, "ring_style.title", "");
      product.brand = "GS Diamonds";
      product.dimension1 = get(options, "metal.title", "");
      product.dimension2 = get(options, "ring_collection.title", "");
      product.dimension3 = get(options, "stone_shape.title", "");
      break;
      default:
      break;
  }

  return product;
}
