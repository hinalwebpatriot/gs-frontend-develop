import { combineReducers } from "redux";
import { pushLogout } from "./Auth/Login/LoginModalActions";
import auth from "./_reducers/AuthReducer";
import shared from "./_reducers/SharedReducer";
import diamondsFeed from "./_reducers/DiamondsFeedReducer";
import engagementFeed from "./_reducers/EngagementFeedReducer";
import weddingFeed from "./_reducers/WeddingFeedReducer";
import engagementProduct from "./_reducers/EngagementProductReducer";
import weddingProduct from "./_reducers/WeddingProductReducer";
import settings from "./_reducers/SettingsReducer";
import favorite from "./_reducers/FavoriteReducer";
import compare from "./_reducers/CompareReducer";
import compareAndFavoriteBar from "./_reducers/CompareAndFavoriteBarReducer";
import search from "./_reducers/SearchReducer";
import completedRings from "./_reducers/CompletedRingsReducer";
import cart from "./_reducers/CartReducer";
import delivery from "./_reducers/DeliveryReducer";
import payment from "./_reducers/PaymentReducer";
import confirmation from "./_reducers/ConfirmationReducer";
import seo from "./_reducers/SeoReducer";
import blog from "./_reducers/BlogReducer";
import breadcrumbs from "./_reducers/BreadcrumbsReducer";
import main from "./_reducers/MainReducer";
import reviews from "./_reducers/ReviewsReducer";
import staticPages from "./_reducers/StaticPageReducer";
import dynamicPages from "./_reducers/DynamicPageReducer";
import engraving from "./_reducers/EngravingReducer";
import landingData from "./_reducers/LandingReducer";
import catalogFeed from "./_reducers/CatalogFeedReducer";
import catalogProduct from "./_reducers/CatalogProductReducer";


const product = combineReducers({
  engagementProduct,
  weddingProduct,
  catalogProduct
});

const feed = combineReducers({
  diamondsFeed,
  engagementFeed,
  weddingFeed,
  catalogFeed
});

const appReducer = combineReducers({
  auth,
  shared,
  settings,
  main,
  blog,
  feed,
  product,
  favorite,
  compare,
  compareAndFavoriteBar,
  completedRings,
  search,
  cart,
  delivery,
  payment,
  confirmation,
  reviews,

  staticPages,
  dynamicPages,

  breadcrumbs,
  seo,
  engraving,
  landingData
});

export default (state, action) => {
  if (action.type === pushLogout.SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};
