// import { Base64 } from 'js-base64';
import jwt from 'jsonwebtoken';
import clientConfig from "../../../config/client.config";
import { createRoutine } from "redux-saga-routines";
import { all, put, select, takeLatest , getContext } from "redux-saga/effects";
import selectors from "../../_selectors/deliverySelectors";
import cartSelectors from "../../_selectors/cartSelectors";
import notification from "../../../utils/notification";
import {
  officeDeliveryValidation,
  officeAndHomeDeliveryValidation,
  showroomDeliveryValidation
} from "./DeliveryValidation";

import GoogleEE from '../../_common/GoogleEE/GoogleEE'

import routing from "../../../config/routing";

export const saveDeliveryField = createRoutine("DELIVERY_FIELD_SAVE");

export const allowDeliveryRoute = createRoutine("DELIVERY_ROUTE_ALLOW");
export const setIsGift = createRoutine("DELIVERY_IS_GIFT_SET");
export const setSameBillingAddress = createRoutine(
  "DELIVERY_FIELD_BILLING_SET"
);

export const cloneOfficeToHomeFields = createRoutine(
  "DELIVERY_OFFICE_TO_HOME_SAVE"
);
export const setDeliveryTab = createRoutine("DELIVERY_TAB_SET");
export const pushDeliveryData = createRoutine("DELIVERY_DATA_PUSH");

export const invalidDeliveryData = createRoutine(
  "DELIVERY_DATA_VALIDATION_ERRORS"
);

export const removeFromCartAfterOrder = createRoutine('REMOVE_FROM_CART_AFTER_ORDER');

function validateData(tab, sameBillingAddress, input) {
  if ((tab === "office" || tab === "home") && !sameBillingAddress) {
    return officeAndHomeDeliveryValidation(input);
  }

  if (tab === "office" && sameBillingAddress) {
    return officeDeliveryValidation(input);
  }

  if (tab === "showroom") {
    return showroomDeliveryValidation(input);
  }

  return {
    errors: {
      shared: {},
      office: {},
      home: {},
      showroom: {}
    },
    isValid: true
  };
}

function formatRequestBody(tab, sameBillingAddress, input) {
  const { shared, home, office, showroom } = input;

  if ((tab === "office" || tab === "home") && !sameBillingAddress) {
    return {
      Shared: {
        email: shared.email,
        first_name: office.firstName,
        last_name: office.lastName,
        phone_number: office.phoneNumber,
        additional_phone_number: office.secondPhoneNumber,
        comment: shared.comment,
        gift: shared.isGift ? 1 : 0
      },
      Office: {
        address: office.address,
        company_name: office.companyName,
        zip_postal_code: office.postalCode,
        town_city: office.city,
        country: office.country,
        state: office.state,
        billing_address: shared.sameBillingAddress ? 1 : 0,
        special_package: shared.specialPackage ? 1 : 0
      },
      Home: {
        address: home.address,
        first_name: home.firstName,
        last_name: home.lastName,
        phone_number: home.phoneNumber,
        additional_phone_number: home.secondPhoneNumber,
        zip_postal_code: home.postalCode,
        town_city: home.city,
        country: home.country,
        state: home.state,
        appartman_number: home.buildingNumber //Backend syntax error
      }
    };
  }

  if (tab === "office" && sameBillingAddress) {
    return {
      Shared: {
        email: shared.email,
        first_name: office.firstName,
        last_name: office.lastName,
        phone_number: office.phoneNumber,
        additional_phone_number: office.secondPhoneNumber,
        comment: shared.comment,
        gift: shared.isGift ? 1 : 0
      },
      Office: {
        address: office.address,
        company_name: office.companyName,
        zip_postal_code: office.postalCode,
        town_city: office.city,
        country: office.country,
        state: office.state,
        billing_address: shared.sameBillingAddress ? 1 : 0,
        special_package: shared.specialPackage ? 1 : 0
      }
    };
  }

  if (tab === "showroom") {
    return {
      Shared: {
        email: shared.email,
        first_name: showroom.firstName,
        last_name: showroom.lastName,
        phone_number: showroom.phoneNumber,
        additional_phone_number: showroom.secondPhoneNumber,
        comment: shared.comment,
        gift: shared.isGift ? 1 : 0
      },
      Showroom: {
        id_showroom: showroom.showroomId
      }
    };
  }

  return {};
}

function* cloneFieldsWorker() {
  const { office, home, shared } = yield select(selectors.input);

  if (shared.sameBillingAddress) {
    return;
  }

  let newState = {};

  Object.keys(home).forEach(key => {
    if (office.hasOwnProperty(key)) {
      newState[key] = office[key];
    }
  });

  yield put(cloneOfficeToHomeFields(newState));
}

function* pushDeliveryDataWorker({ payload }) {
  const input = yield select(selectors.input);

  const { sameBillingAddress, tab } = input.shared;

  const { errors, isValid } = validateData(tab, sameBillingAddress, input);

  if (!isValid.global) {
    yield put(invalidDeliveryData({ errors, isValid }));
  } else {
    yield put(invalidDeliveryData.fulfill());

    try {
      yield put(pushDeliveryData.request());

      const api = yield getContext('api');
      const res = yield api.checkout.createOrder(
        formatRequestBody(tab, sameBillingAddress, input)
      );

      notification("success", res.data.message);

      const cart = yield select(cartSelectors.data)

      yield put(pushDeliveryData.success());
      yield put(removeFromCartAfterOrder.success(cart.count));
      
      if (tab === "showroom") {
        GoogleEE.checkoutStep({
          products: cart.items,
          step: 2,
          option: GoogleEE.CART_SHOWROOM
        });

        GoogleEE.checkoutStep({
          products: cart.items,
          step: 3,
          option: GoogleEE.CART_METHOD_NONE
        });

        payload.push(routing(`default?id=${res.data.id}`).paymentSuccess);
      } else {
        GoogleEE.checkoutStep({
          products: cart.items,
          step: 2,
          option: GoogleEE.CART_DELIVERY
        });

        const hashId = jwt.sign(res.data.id, clientConfig.orderSecret.key);
        payload.push(routing(hashId).order);

      }
    } catch (err) {
      console.error(err);
      yield put(pushDeliveryData.failure());
      if (err.response) {
        notification("error", err.response.data.message);
      }
    }
  }
}

export function* deliveryWatcher() {
  yield all([
    takeLatest(setSameBillingAddress.TRIGGER, cloneFieldsWorker),
    takeLatest(pushDeliveryData.TRIGGER, pushDeliveryDataWorker)
    // takeLatest(removeFromCart.SUCCESS, fetchCartWorker),
    // takeLatest(addToCart.TRIGGER, pushAddWorker),
    // takeLatest(removeFromCart.TRIGGER, pushRemoveWorker),
  ]);
}
