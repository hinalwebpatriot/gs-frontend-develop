import { handleActions } from "redux-actions";

export function toggleItemInArray(state, payload) {
  const clonedState = [...state];

  if (clonedState.includes(payload)) {
    return clonedState.filter(item => item !== payload);
  } else {
    return [...clonedState, payload];
  }
}

export function makeStatusReducer(action) {
  return handleActions(
    {
      [action.REQUEST]() {
        return "request";
      },
      [action.SUCCESS]() {
        return "success";
      },
      [action.FAILURE]() {
        return "failure";
      },
      [action.FULFILL]() {
        return "none";
      }
    },
    "none"
  );
}

export function makeStatusWithResetReducer(action, resetAction) {
  return handleActions(
    {
      [action.REQUEST]() {
        return "request";
      },
      [action.SUCCESS]() {
        return "success";
      },
      [action.FAILURE]() {
        return "failure";
      },
      [resetAction]() {
        return "none";
      }
    },
    "none"
  );
}
