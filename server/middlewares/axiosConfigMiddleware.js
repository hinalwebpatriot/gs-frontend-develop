import { ApiService } from '../../src/config/api';
import { API_URL } from '../../src/config/server.config';
import moment from "moment";
import Tracker from '../utils/Tracker';

export default (req, res, next) => {
  res.tracker = new Tracker();
  res.tracker.mark('FirstChunk', 'start');

  const backend = new ApiService({
    baseURL: API_URL,
    timeout: 60000,
    withCredentials: true,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": req.locale || '',
      "User-Agent": req.header("User-Agent") || '',
      "X-DIAMONDS-CURRENCY": 'AUD', // AUD req.header("X-DIAMONDS-CURRENCY")
      "X-DIAMONDS-COUNTRY": 'AU', // AU req.header("X-DIAMONDS-COUNTRY")
      "Authorization": req.header("Authorization") || '',
      "Cookie": Object.keys(req.cookies)
        .map(key => `${key}=${encodeURIComponent(req.cookies[key])}`)
        .join("; ") || ''
    }
  });

  // // console.log("-----------STR------------");
  // switch (req.connection.remoteAddress) {
  //   case "::1":
  //     console.log(`[Request by Me]: ${req.url}, --> ${req.headers['user-agent']}`);
  //     break;
  //   default:
  //     console.log(`[Request by ${req.headers['x-real-ip']}]: ${req.url}, --> ${req.headers['user-agent']}`);
  // }

  console.log(`[${req.headers['x-forwarded-for']}][+]: ${req.url}, --> ${req.headers['user-agent']}`)

  if (process.env.NODE_ENV === 'development') {
    backend.axios.interceptors.request.use(
      function(config) {
        config.metadata = { startTime: moment() };
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );

    backend.axios.interceptors.response.use(
      function(response) {
        response.config.metadata.endTime = moment();
        response.duration = response.config.metadata.endTime.diff(
          response.config.metadata.startTime,
          "milliseconds"
        );

        console.log(
          `[${response.request.path}][${response.status}]: 
        d: ${response.duration}ms
        s: ${response.config.metadata.startTime.format("HH:MM:ss.SSS")}
        e: ${response.config.metadata.endTime.format("HH:MM:ss.SSS")}
    `
        );
        return response;
      },
      function(error) {
        error.config.metadata.endTime = moment();
        error.duration = error.config.metadata.endTime.diff(
          error.config.metadata.startTime,
          "milliseconds"
        );

        console.log(
          `[${error.request.path}][${error.response.status}]: 
        d: ${error.duration}ms
        s: ${error.config.metadata.startTime.format("HH:MM:ss.SSS")}
        e: ${error.config.metadata.endTime.format("HH:MM:ss.SSS")}
    `
        );
        return Promise.reject(error);
      }
    );
  }

  res.axios = backend.axios;
  res.api = backend.api;

  res.tracker.mark('Axios', 'end');
  next()
};
