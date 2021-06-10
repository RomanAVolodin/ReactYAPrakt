import {
  createUserApiUrl,
  getUserApiUrl,
  ingredientsApiUrl,
  loginUserApiUrl,
  logoutUserApiUrl,
  passwordResetApiUrl,
  passwordResetRequestApiUrl,
  refreshTokenApiUrl,
  updateUserApiUrl,
} from './apiURLs';
import { User } from '../models/user';
import { getCookie, getFromLocalStorage } from './utils';

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

export const getUserRequest = async () =>
  await fetch(getUserApiUrl, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

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

export const updateUserRequest = async (user: User) => {
  return await fetch(updateUserApiUrl, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(user),
  });
};

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
