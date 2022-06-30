import { combineReducers } from "redux";
import saleFeed from '../Dynamic/Sale/SaleReducer';

const dynamicPages = combineReducers({
  saleFeed
});


export default dynamicPages;
