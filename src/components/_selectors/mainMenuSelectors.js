import { get } from "lodash";

const status = state => state.shared.menu.status;
const menu = (state, name) => get(state, `shared.menu.data[${name}]]`, null);

export default {
  status,
  menu
};
