import { get } from "lodash";

const status = state => state.shared.videoHints.status;
const getHint = (state, props) =>
  get(state, `shared.videoHints.data[${props.category}][${props.type}]`, "");

export default {
  status,
  getHint
};
