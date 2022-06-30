import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer } from "../../utils/reduxHelpers";

import * as actions from "../CompletedRings/CompletedRingsActions";

const status = makeStatusReducer(actions.fetchCompletedRings);

const dataInitial = {
  keys: [],
  items: {}
};

const data = handleActions(
  {
    [actions.fetchCompletedRings.SUCCESS](state, { payload }) {
      let keys = [];
      let items = {};

      payload.forEach(item => {
        const key = Number(item.id);
        items[key] = item;
        keys.push(key);
      });

      return {
        keys,
        items
      };
    },
    [actions.deleteCompletedRing.TRIGGER](state, { payload }) {
      const items = { ...state.items };

      items[payload] = {
        ...items[payload],
        isDeleting: true
      };

      return {
        keys: state.keys,
        items
      };
    },
    [actions.deleteCompletedRing.SUCCESS](state, { payload }) {
      let keys = [];
      let items = {};

      state.keys.forEach(key => {
        if (key !== payload) {
          items[key] = { ...state.items[key] };
          keys.push(key);
        }
      });

      return {
        keys,
        items
      };
    },
    [actions.fetchCompletedRings.FULFILL]() {
      return dataInitial;
    }
  },
  dataInitial
);

const completedRings = combineReducers({
  status,
  data
});

export default completedRings;
