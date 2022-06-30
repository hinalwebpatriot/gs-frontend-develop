import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer } from "../../utils/reduxHelpers";

import * as actions from "../Checkout/Delivery/DeliveryActions";

const statusReducer = makeStatusReducer(actions.pushDeliveryData);

const sharedInitial = {
  tab: "office",
  email: "",
  comment: "",
  isGift: false,
  specialPackage: false,
  sameBillingAddress: true,
  allowedRoute: false
};

const sharedInputReducer = handleActions(
  {
    [actions.setDeliveryTab.TRIGGER](state, { payload }) {
      return { ...state, tab: payload };
    },
    [actions.setSameBillingAddress.TRIGGER](state) {
      return { ...state, sameBillingAddress: !state.sameBillingAddress };
    },
    [actions.setIsGift.TRIGGER](state, { payload }) {
      return { ...state, isGift: payload };
    },
    [actions.allowDeliveryRoute.TRIGGER](state) {
      return { ...state, allowedRoute: true };
    },
    [actions.saveDeliveryField.TRIGGER](state, { payload }) {
      const { type, field, value } = payload;

      if (type === "shared") {
        switch (field) {
          case "email":
            return { ...state, email: value };
          case "comment":
            return { ...state, comment: value };
          case "specialPackage":
            return { ...state, specialPackage: !state.specialPackage };
          default:
            return state;
        }
      } else {
        return state;
      }
    },
    [actions.pushDeliveryData.FULFILL]() {
      return sharedInitial;
    }
  },
  sharedInitial
);

const officeInitial = {
  firstName: "",
  lastName: "",
  address: "",
  companyName: "",
  city: "",
  postalCode: "",
  country: "",
  state: "",
  phoneNumber: "",
  secondPhoneNumber: ""
};

const officeInputReducer = handleActions(
  {
    [actions.saveDeliveryField.TRIGGER](state, { payload }) {
      const { type, field, value } = payload;

      if (type === "office") {
        switch (field) {
          case "firstName":
            return { ...state, firstName: value };
          case "lastName":
            return { ...state, lastName: value };
          case "address":
            return { ...state, address: value };
          case "companyName":
            return { ...state, companyName: value };
          case "city":
            return { ...state, city: value };
          case "postalCode":
            return { ...state, postalCode: value };
          case "country":
            return { ...state, country: value };
          case "state":
            return { ...state, state: value };
          case "phoneNumber":
            return { ...state, phoneNumber: value };
          case "secondPhoneNumber":
            return { ...state, secondPhoneNumber: value };
          default:
            return state;
        }
      } else {
        return state;
      }
    },
    [actions.pushDeliveryData.FULFILL]() {
      return officeInitial;
    }
  },
  officeInitial
);

const homeInitial = {
  firstName: "",
  lastName: "",
  address: "",
  buildingNumber: "",
  city: "",
  postalCode: "",
  country: "",
  state: "",
  phoneNumber: "",
  secondPhoneNumber: ""
};

const homeInputReducer = handleActions(
  {
    [actions.saveDeliveryField.TRIGGER](state, { payload }) {
      const { type, field, value } = payload;

      if (type === "home") {
        switch (field) {
          case "firstName":
            return { ...state, firstName: value };
          case "lastName":
            return { ...state, lastName: value };
          case "address":
            return { ...state, address: value };
          case "buildingNumber":
            return { ...state, buildingNumber: value };
          case "city":
            return { ...state, city: value };
          case "postalCode":
            return { ...state, postalCode: value };
          case "country":
            return { ...state, country: value };
          case "state":
            return { ...state, state: value };
          case "phoneNumber":
            return { ...state, phoneNumber: value };
          case "secondPhoneNumber":
            return { ...state, secondPhoneNumber: value };
          default:
            return state;
        }
      } else {
        return state;
      }
    },
    [actions.cloneOfficeToHomeFields.TRIGGER](state, { payload }) {
      return { ...homeInitial, ...payload };
    },
    [actions.pushDeliveryData.FULFILL]() {
      return homeInitial;
    }
  },
  homeInitial
);

const showroomInitial = {
  firstName: "",
  lastName: "",
  address: "455 George Street",
  companyName: "GS Diamond",
  city: "Sydney",
  postalCode: "NSW 2000",
  country: "Australia",
  showroomId: 1,
  phoneNumber: "",
  secondPhoneNumber: ""
};

const showroomInputReducer = handleActions(
  {
    [actions.saveDeliveryField.TRIGGER](state, { payload }) {
      const { type, field, value } = payload;

      if (type === "showroom") {
        switch (field) {
          case "firstName":
            return { ...state, firstName: value };
          case "lastName":
            return { ...state, lastName: value };
          case "phoneNumber":
            return { ...state, phoneNumber: value };
          case "secondPhoneNumber":
            return { ...state, secondPhoneNumber: value };
          default:
            return state;
        }
      } else {
        return state;
      }
    },
    [actions.pushDeliveryData.FULFILL]() {
      return showroomInitial;
    }
  },
  showroomInitial
);

const initialErrors = {
  shared: {},
  office: {},
  home: {},
  showroom: {},
  isValid: {
    office: "none",
    home: "none",
    showroom: "none",
    global: "none"
  }
};

const errorsReducer = handleActions(
  {
    [actions.invalidDeliveryData.TRIGGER](state, { payload }) {
      return { ...payload.errors, isValid: payload.isValid };
    },
    [actions.invalidDeliveryData.FULFILL]() {
      return { ...initialErrors };
    },
    [actions.pushDeliveryData.FULFILL]() {
      return initialErrors;
    }
  },
  initialErrors
);

// const errors = combineReducers({
//   shared: sharedErrorsReducer,
//   office: officeErrorsReducer,
//   home: homeErrorsReducer,
//   showroom: showroomErrorsReducer
// })

const input = combineReducers({
  shared: sharedInputReducer,
  office: officeInputReducer,
  home: homeInputReducer,
  showroom: showroomInputReducer
});

const delivery = combineReducers({
  status: statusReducer,
  input: input,
  errors: errorsReducer
});

export default delivery;
