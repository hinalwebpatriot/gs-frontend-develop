import { all, fork, put, select } from "redux-saga/effects";
import { isServer } from "../utils/isServer";
import { settingsStatusSelector } from "./_selectors/settingSelector";
import videoHintsSelectors from "./_selectors/videoHintsSelectors";
import { contactBlockStatusSelector } from "./_selectors/showroomBlockSelectors";

import {
  fetchContactData,
  fetchContactDataWorker,
  fetchShowroomDataWorker,
  showroomWatcher
} from "./_common/ShowroomBlock/ShowroomBlockActions";
import {
  deviceWatcher
} from "./_common/HOC/ResizeWatcherActions";
import { diamondsFeedWatcher } from "./Feed/Diamonds/DiamondsFeedActions";
import { fetchUserChoiceWorker, loginWatcher, pushLoginByToken } from './Auth/Login/LoginModalActions';
import {
  countryDropdownWatcher,
  fetchSettings,
  getSettingsWorker
} from "./_common/CountryDropdown/CountryDropdownActions";
import { engagementFeedWatcher } from "./Feed/Engagement/EngagementFeedActions";
import { weddingFeedWatcher } from "./Feed/Wedding/WeddingFeedActions";
import { catalogFeedWatcher } from "./Feed/Catalog/CatalogFeedActions";
import { engagementProductWatcher } from "./Product/Engagement/EngagementPageActions";
import { weddingProductWatcher } from "./Product/Wedding/WeddingPageActions";
import { catalogProductWatcher } from "./Product/Catalog/CatalogPageActions";
import { favoriteWatcher, fetchFavorites } from './Favorite/FavoriteActions';
import { compareWatcher, fetchCompare } from './Compare/CompareActions';
import { compareAndFavoriteWatcher } from "./_common/CompareAndFavorites/CompareAndFavoriteWatcher";
import { searchWatcher } from "./Search/SearchActions";
import { completedRingsWatcher } from "./CompletedRings/CompletedRingsActions";
import { cartWatcher } from "./Checkout/Cart/CartActions";
import { cartServicesWatcher } from "./Checkout/CartServices/CartServicesActions";

import { deliveryWatcher } from "./Checkout/Delivery/DeliveryActions";
import { paymentWatcher } from "./Checkout/Payment/PaymentActions";
import { confirmationWatcher } from "./Checkout/Confirmation/ConfirmationActions";
import {
  fetchVideoHints,
  videoHintsWatcher,
  videoHintWorker
} from "./_common/VideoHint/VideoHintsActions";
import { seoWatcher } from "./_common/SEO/SeoActions";
import { blogWatcher } from "./Blog/BlogActions";
import { staticPageWatcher } from "./Static/StaticPageActions";
import { mainWatcher } from "./Main/MainActions";
import { reviewsWatcher } from "./Reviews/ReviewsActions";

import dynamicPageSaga from './Dynamic/DynamicPageSaga';
import { fetchMainMenuWorker } from './Wrapper/HeaderMenu/HeaderMenuActions';
import mainMenuWatcher from './Wrapper/HeaderMenu/HeaderMenuActions';
import favoriteSelectors from './_selectors/favoriteSelectors';
import compareSelectors from './_selectors/compareSelectors';
import cartSelectors from './_selectors/cartSelectors';
import landingWatcher from "./Landing/LandingActions";

function* initClientApp() {
  if (isServer) {
    return;
  }

  yield put(pushLoginByToken());

  const settingsStatus = yield select(settingsStatusSelector);
  const videoHintsStatus = yield select(videoHintsSelectors.status);
  const contactStatus = yield select(contactBlockStatusSelector);

  const favoriteStatus = yield select(favoriteSelectors.status);
  const compareStatus = yield select(compareSelectors.status);
  const cartStatus = yield select(cartSelectors.status);

  if (favoriteStatus !== 'success') {
    yield put(fetchFavorites())
  }

  if (compareStatus !== 'success') {
    yield put(fetchCompare())
  }

  if (cartStatus !== 'success') {
    yield put(fetchCompare())
  }

  if (settingsStatus !== "success") {
    yield put(fetchSettings());
  }

  // if (yield select(authStatusSelector) !== "success") {
  //
  // }

  if (videoHintsStatus !== "success") {
    yield put(fetchVideoHints());
  }

  if (contactStatus !== "success") {
    yield put(fetchContactData());
  }

}

export function* initServerApp(settings) {
  yield fork(getSettingsWorker, { payload: settings });
  yield fork(fetchUserChoiceWorker);
  yield fork(fetchMainMenuWorker);
  yield fork(fetchShowroomDataWorker);
  yield fork(fetchContactDataWorker);
  yield fork(videoHintWorker);
}

export default function* rootSaga() {
  yield all([
    fork(mainWatcher),
    fork(reviewsWatcher),
    fork(staticPageWatcher),
    fork(blogWatcher),
    fork(seoWatcher),
    fork(videoHintsWatcher),
    fork(confirmationWatcher),
    fork(paymentWatcher),
    fork(deliveryWatcher),
    fork(cartWatcher),
    fork(cartServicesWatcher),
    fork(completedRingsWatcher),
    fork(searchWatcher),
    fork(favoriteWatcher),
    fork(compareWatcher),
    fork(deviceWatcher),
    fork(showroomWatcher),
    fork(mainMenuWatcher),
    fork(diamondsFeedWatcher),
    fork(engagementFeedWatcher),
    fork(engagementProductWatcher),
    fork(weddingFeedWatcher),
    fork(weddingProductWatcher),
    fork(catalogFeedWatcher),
    fork(catalogProductWatcher),
    fork(loginWatcher),
    fork(countryDropdownWatcher),
    fork(compareAndFavoriteWatcher),
    fork(dynamicPageSaga),
    fork(landingWatcher),

    fork(initClientApp)
  ]);
}
