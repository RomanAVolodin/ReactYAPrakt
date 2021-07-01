import {
  createUserApiUrl,
  getUserApiUrl,
  ingredientsApiUrl,
  loginUserApiUrl,
  logoutUserApiUrl, orderApiUrl,
  passwordResetApiUrl,
  passwordResetRequestApiUrl,
  refreshTokenApiUrl,
  updateUserApiUrl,
} from './apiURLs';
import { User } from '../models/user';
import { getFromLocalStorage } from './utils';
import http from './http';

export const registerRequest = async (user: User) => {
  return await fetch(createUserApiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(user),
  });
};

export const loginRequest = async (user: User) => {
  return await fetch(loginUserApiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(user),
  });
};

export const getUserRequest = async () => await http.get(getUserApiUrl).then((res) => res.data);
export const placeOrderRequest = async (dataToPost: Object) => await http.post(orderApiUrl, dataToPost).then((res) => res.data);

export const logoutRequest = async () => {
  return await fetch(logoutUserApiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: getFromLocalStorage('refreshToken') }),
  });
};

export const refreshTokenRequest = async () => {
  return await fetch(refreshTokenApiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: getFromLocalStorage('refreshToken') }),
  });
};

export const passwordResetRequest = async (email: string) => {
  return await fetch(passwordResetRequestApiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const doPasswordResetRequest = async (password: string, token: string) => {
  return await fetch(passwordResetApiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      password,
      token,
    }),
  });
};

export const updateUserRequest = async (user: User) =>
  await http.patch(updateUserApiUrl, JSON.stringify(user)).then((res) => res.data);

export const getIngredientsRequest = async () =>
  await fetch(ingredientsApiUrl, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
