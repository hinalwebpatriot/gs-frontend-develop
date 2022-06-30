import { SITEMAP_PATH } from "../../src/config/server.config";
import axios from "axios";

export default (req, res) => {
  axios
    .get(`${SITEMAP_PATH}/sitemap.xml`, {
      timeout: 25000,
      responseType: "text"
    })
    .then(axiosResponse => {
      Object.keys(axiosResponse.headers).forEach(key =>
        res.set(key, axiosResponse.headers[key])
      );
      res.status(axiosResponse.status);
      res.send(axiosResponse.data);
    })
    .catch(err => {
      res.status(500);
      console.error(err);
      res.send("Internal error");
    });
};
