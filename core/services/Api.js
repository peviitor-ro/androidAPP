import axios from 'axios';
import CONSTANTS from './CONSTANTS';

const PUBLIC_API = axios.create({
  baseURL: CONSTANTS.url,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default PUBLIC_API;

