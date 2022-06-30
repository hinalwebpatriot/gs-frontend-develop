import axios from 'axios'
import { isServer } from "../utils/isServer";
import { API_URL } from './server.config';

const nodeRequests = axios.create({
  baseURL: API_URL,
  timeout: 90000
});

export const axiosInstance = isServer
  ? nodeRequests
  : axios

