import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import { updateCompareAndFavoriteBar } from "../_common/CompareAndFavorites/CompareAndFavoriteWatcher";

// const status = makeStatusReducer(actions.fetchCompare);
// const syncStatus = makeStatusReducer(actions.syncCompare);

const actionReducer = handleActions(
  {
    [updateCompareAndFavoriteBar.TRIGGER](state, { payload }) {
      return payload;
    }
  },
  "none"
);

// const itemsReducer = handleActions(
//   {
//     [updateCompareAndFavoriteBar.TRIGGER](state, { payload }) {
//       const { id, type } = payload;
//       const element = state.find(item => item.id === id && item.type === type);
//
//       if (element) {
//         return state.filter(item => item.id === id && item.type === type);
//       } else {
//         return [payload, ...state];
//       }
//     },
//   },
//   dataInitial.items
// );

const compareAndFavoriteBar = combineReducers({
  lastAction: actionReducer
  // items: itemsReducer,
});

export default compareAndFavoriteBar;
