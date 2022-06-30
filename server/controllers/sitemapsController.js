import { SITEMAP_PATH } from "../../src/config/server.config";
import axios from "axios";

export default (req, res) => {
  const { path, file } = req.params;
  axios
    .get(`${SITEMAP_PATH}/${path}/${file}`, {
      timeout: 10000,
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
      res.send("Internal error");
    });
};
