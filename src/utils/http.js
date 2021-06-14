import axios from 'axios';
import {
  deleteCookie,
  getCookie,
  getTokenFromPayload,
  removeFromLocalStorage,
  saveToLocalStorage,
  setCookie,
} from './utils';
import { refreshTokenRequest } from './api';
import { toast } from 'react-toastify';
import { history } from '../components/app/app';

let isRefreshing = false;
let refreshSubscribers = [];

const http = axios.create();
http.defaults.headers.common = { Authorization: `Bearer ${getCookie('accessToken')}` };

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401 || status === 403) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenRequest()
          .then((resp) => resp.json())
          .then((data) => {
            if (!data.success) {
              throw new Error(
                data.message ? data.message : 'Refresh токен просрочен или не настоящий',
              );
            }
            const token = getTokenFromPayload(data.accessToken);
            setCookie('accessToken', token);
            saveToLocalStorage('refreshToken', data.refreshToken);
            isRefreshing = false;
            onRrefreshed(token);
          })
          .catch((err) => {
            toast.error(err.message);
            removeFromLocalStorage('refreshToken');
            deleteCookie('accessToken');
            history.replace('/login');
          });
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          resolve(axios(originalRequest));
        });
      });
    } else {
      return Promise.reject(error);
    }
  },
);

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRrefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
};

export default http;
