import { client } from '../config/api';

export default token => {
  if (token) {
    client.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete client.axios.defaults.headers.common["Authorization"];
  }
};
