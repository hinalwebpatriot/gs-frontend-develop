import { handleActions } from "redux-actions";
import { fetchFirstLandingData } from "../Landing/LandingActions";

// const fetchLandingData = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case 'FETCH_LANDING_DATA':
//       console.log('!!', type, payload);
//       return {
//         ...state,
//         landing: payload
//       };
//     default:
//       return state;
//   }
// };
const landingData = handleActions(
  {
    [fetchFirstLandingData.TRIGGER]() {
      return {
        data: [],
        status: 'trigger'
      };
    },
    [fetchFirstLandingData.SUCCESS](state, { payload: { data } }) {
      return {
        data,
        status: 'success'
      };
    },
    [fetchFirstLandingData.FAILURE]() {
      return {
        data: [],
        status: 'error'
      };
    }
  },
  []
);

export default landingData;

// export default fetchLandingData;
