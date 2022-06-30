import { createSelector } from "reselect";
const status = state => state.delivery.status;
const input = state => state.delivery.input;
const errors = state => state.delivery.errors;

const isRouteAllowed = state => state.delivery.input.shared.allowedRoute;

const flattenErrors = createSelector(
  errors,
  errors => getFlatErrors(errors)
);

const getFlatErrors = data => {
  let flattenErrors = {};

  Object.keys(data).forEach(tabKey => {
    if (tabKey === "tab" || tabKey === "isValid") {
      //exclude tab and isValid
      return;
    }
    Object.keys(data[tabKey]).forEach(key => {
      flattenErrors[`${tabKey}_${key}`] = data[tabKey][key];
    });
  });

  return flattenErrors;
};

const inputByTab = (state, tab) => state.delivery.input[tab];
const currentTab = state => state.delivery.input.shared.tab;
const showHome = state => !state.delivery.input.shared.sameBillingAddress;

export default {
  status,
  input,
  errors,
  inputByTab,
  currentTab,
  showHome,
  isRouteAllowed,
  flattenErrors
};
