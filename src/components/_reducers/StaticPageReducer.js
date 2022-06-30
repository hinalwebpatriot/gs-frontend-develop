import { handleActions } from "redux-actions";

import * as actions from "../Static/StaticPageActions";

const itemScheme = {
  isFetched: false,
  isError: false,
  data: {}
};

const staticPageReducer = handleActions(
  {
    [actions.fetchStaticPage.TRIGGER](state, { payload }) {
      return {
        ...state,
        [payload]: itemScheme
      };
    },
    [actions.fetchStaticPage.SUCCESS](state, { payload }) {
      return {
        ...state,
        [payload.slug]: {
          isFetched: true,
          isError: false,
          data: payload.data
        }
      };
    },
    [actions.fetchStaticPage.FAILURE](state, { payload }) {
      return {
        ...state,
        [payload.slug]: {
          isFetched: false,
          isError: true,
          data: {}
        }
      };
    },
    [actions.fetchStaticPage.FULFILL](state, { payload }) {
      const keys = Object.keys(state).filter(key => payload.slug !== key);
      let newState = {};

      keys.forEach(key => {
        newState[key] = state[key];
      });

      return newState;
    }
  },
  {}
);

const staticPages = staticPageReducer;

export default staticPages;
