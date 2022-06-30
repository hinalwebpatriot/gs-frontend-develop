import ReactGA from "react-ga";
import trackProductClick from "./trackProductClick";
import trackAddToCart from "./trackAddToCart";
import trackRemoveFromCart from "./trackRemoveFromCart";
import trackProductView from "./trackProductView";
import trackProductDetailsView from "./trackProductDetailsView";
import trackCheckoutStep from "./trackCheckoutStep";
import trackCheckoutSuccess from "./trackCheckoutSuccess";

class GoogleEEBuilder {
  constructor() {
    this.LIST_SLIDER = "Slider";
    this.LIST_FEED = "Feed";
    this.LIST_SEARCH = "Search";
    this.LIST_FAVORITE = "Favorite";
    this.LIST_COMPARE = "Compare";
    this.LIST_CART = 'Cart';
    this.LIST_RING_CONSTRUCTOR = 'Ring Constructor';

    this.CART_DELIVERY = "Delivery";
    this.CART_SHOWROOM = "Showroom";

    this.CART_METHOD_PAYPAL = "Paypal";
    this.CART_METHOD_ALIPAY = "Alipay";
    this.CART_METHOD_ADYEN = "Adyen";
    this.CART_METHOD_BANK = "Bank Transfer";
    this.CART_METHOD_NONE = "None"; // if set showroom

    this.EVENT_CATEGORY = "Enhanced Ecommerce";
    this.EVENT_ACTION_CLICK = "Catalog Click";
    this.EVENT_ACTION_ADD_TO_CART = "Add To Cart";
    this.EVENT_ACTION_REMOVE_FROM_CART = "Remove From Cart";
    this.EVENT_ACTION_LOG_DETAIL = "View Details";
    this.EVENT_ACTION_ORDER_STEP = "Order Step";
    this.EVENT_ACTION_PURCHASE = "Purchase";
  }

  productView({ product, list, position }) {
    const { data, currencyCode } = trackProductView({
      product,
      list,
      position
    });
    ReactGA.set({ currencyCode });
    ReactGA.plugin.execute("ec", "addImpression", data);

    if (!list) {
      console.warn("List param is required", product);
    }
  }

  productDetailsView({ product }) {
    const { currencyCode, data, event } = trackProductDetailsView({ product });
    ReactGA.set({ currencyCode });
    ReactGA.plugin.execute("ec", "addProduct", data);
    ReactGA.plugin.execute("ec", "setAction", "detail");
    ReactGA.event(event);
  }

  productClick({ product, list, position }) {
    const { currencyCode, data, event } = trackProductClick({ product, list, position });
    ReactGA.set({ currencyCode });
    ReactGA.plugin.execute("ec", "addProduct", data);
    ReactGA.plugin.execute("ec", "setAction", "click", { list });
    ReactGA.event(event);

    if (!list) {
      console.warn("List param is required", product);
    }
  }

  addToCart({ products, quantity }) {
    const { currencyCode, data, event } = trackAddToCart({ products, quantity });
    ReactGA.set({ currencyCode });

    data.forEach(item => {
      ReactGA.plugin.execute("ec", "addProduct", item);
    });

    ReactGA.plugin.execute("ec", "setAction", "add");
    ReactGA.event(event);
  }

  removeFromCart({ products, quantity }) {
    const { currencyCode, data, event } = trackRemoveFromCart({ products, quantity });
    ReactGA.set({ currencyCode });

    data.forEach(item => {
      ReactGA.plugin.execute("ec", "addProduct", item);
    });

    ReactGA.plugin.execute("ec", "setAction", "remove");
    ReactGA.event(event);
  }

  checkoutStep({ products, step, option }) {
    const { currencyCode, data, event, action } = trackCheckoutStep({ products, step, option });
    ReactGA.set({ currencyCode });

    data.forEach(item => {
      ReactGA.plugin.execute("ec", "addProduct", item);
    });

    ReactGA.plugin.execute("ec", "setAction", "checkout", action);
    ReactGA.event(event);
  }

  checkoutSuccess({ order, method }) {
    const { currencyCode, data, event, action } = trackCheckoutSuccess({ order, method });
    ReactGA.set({ currencyCode });

    data.forEach(item => {
      ReactGA.plugin.execute("ec", "addProduct", item);
    });

    ReactGA.plugin.execute("ec", "setAction", "purchase", action);
    ReactGA.event(event);
  }
}

const GoogleEE = new GoogleEEBuilder();

export default GoogleEE;
