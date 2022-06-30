import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer } from "../../utils/reduxHelpers";

import * as actions from "../Auth/Login/LoginModalActions";

const isAuth = handleActions(
  {
    [actions.pushLogin.SUCCESS]() {
      return true;
    },
    [actions.pushLogin.FAILURE]() {
      return false;
    },
    [actions.pushLoginByToken.SUCCESS]() {
      return true;
    },
    [actions.pushLoginByToken.FAILURE]() {
      return false;
    }
  },
  false
);

const status = makeStatusReducer(actions.pushLoginByToken);
const modalAuthStatus = makeStatusReducer(actions.pushLogin);

const errors = handleActions(
  {
    [actions.pushLogin.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.pushLogin.FULFILL]() {
      return {};
    }
  },
  {}
);

// const data = handleActions(
//   {
//     [actions.fetchDiamondsFeed.SUCCESS](state, { payload }) {
//       return payload.data
//     },
//     [actions.fetchDiamondsFeedNextPage.SUCCESS](state, { payload }) {
//       return state.concat(payload.data)
//     },
//     [actions.fetchDiamondsFeed.FULFILL]() {
//       return []
//     },
//   },
//   []
// );

const auth = combineReducers({
  status,
  modalAuthStatus: modalAuthStatus,
  errors,
  isAuth
});

export default auth;
