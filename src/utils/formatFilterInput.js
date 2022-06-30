import localeStore from "../config/LocalesStore";

export function formatFilterInput(sign, value, accuracy) {
  switch (sign) {
    case "price":
      // return `$ ${value}`;
      return localeStore.formatPrice(value);
    case "percent":
      return `${value.toFixed(accuracy)} %`;
    case "number":
      return value.toFixed(accuracy);
    default:
      return value;
  }
}
