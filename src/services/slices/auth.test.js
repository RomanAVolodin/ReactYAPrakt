import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { authSlice as slice, getUser, initialState, loginUser, logoutUser, registerUser, updateUser } from './auth';
import fetchMock from 'fetch-mock';
import {
  createUserApiUrl, getUserApiUrl,
  loginUserApiUrl,
  logoutUserApiUrl,
  updateUserApiUrl,
} from '../../utils/apiURLs';
import MockAdapter from 'axios-mock-adapter';
import http from '../../utils/http';
import { getCookie } from '../../utils/utils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Auth slice', () => {
  const reducer = slice.reducer;
  const fakeUser = {
    name: 'User',
    email: 'user@mail.ru',
    password: '123123',
  };
  const tokenResponse = { success: true, data: { accessToken: '6664466644',
      refreshToken: '7747474747' } };

  afterEach(() => {
    fetchMock.restore();
  });

  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Регистрация пользователя', () => {
    fetchMock.postOnce(createUserApiUrl, {
      body: { success: true, data: fakeUser },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      { type: 'login/dataTransferCompletedSuccessfully', payload: undefined },
      {
        type: 'auth/registerCompleted',
        payload: {
          data: fakeUser,
          success: true,
        },
      },
    ];
    const store = mockStore(initialState);
    return store.dispatch(registerUser(fakeUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Ошибка при регистрации пользователя', () => {
    fetchMock.postOnce(createUserApiUrl, {
      body: { success: false, data: {} },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      { type: 'login/errorWhileDataTransfer', payload: undefined },
    ];
    const store = mockStore(initialState);

    return store.dispatch(registerUser(fakeUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Аутентификация пользователя', () => {
    fetchMock.postOnce(loginUserApiUrl, {
      body: tokenResponse,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      {
        type: 'login/dataTransferCompletedSuccessfully',
        payload: undefined
      },
      {
        type: 'auth/loginSuccessfullyCompleted',
        payload: tokenResponse
      },
      { type: 'login/errorWhileDataTransfer', payload: undefined }

    ];
    const store = mockStore(initialState);
    return store.dispatch(loginUser(fakeUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Ошибка при аутентификация пользователя', () => {
    fetchMock.postOnce(loginUserApiUrl, {
      body: {...tokenResponse, success: false},
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      { type: 'login/errorWhileDataTransfer', payload: undefined }
    ];
    const store = mockStore(initialState);
    return store.dispatch(loginUser(fakeUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Обновление данных пользователя', () => {
    const axiosMock = new MockAdapter(http);
    axiosMock.onPatch(updateUserApiUrl).reply(200, { success: true, data: fakeUser });

    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      {
        type: 'login/dataTransferCompletedSuccessfully',
        payload: undefined
      },
      {
        type: 'auth/userUpdateSuccessfullyCompleted',
        payload: { success: true, data: fakeUser }
      }
    ];
    const store = mockStore(initialState);
    return store.dispatch(updateUser(fakeUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Обновление данных пользователя с ошибкой', () => {
    const axiosMock = new MockAdapter(http);
    axiosMock.onPatch(updateUserApiUrl).reply(200, { success: false, data: fakeUser });

    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      { type: 'login/errorWhileDataTransfer', payload: undefined }

    ];
    const store = mockStore(initialState);
    return store.dispatch(updateUser(fakeUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Выход - логаут пользователя', () => {
    fetchMock.postOnce(logoutUserApiUrl, {
      body: {success: true},
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      {
        type: 'login/dataTransferCompletedSuccessfully',
        payload: undefined
      },
      { type: 'auth/loggedOut', payload: undefined }
    ];
    const store = mockStore(initialState);
    return store.dispatch(logoutUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Выход - логаут пользователя - завершено с ошибкой', () => {
    fetchMock.postOnce(logoutUserApiUrl, {
      body: {success: false},
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      { type: 'login/errorWhileDataTransfer', payload: undefined }
    ];
    const store = mockStore(initialState);
    return store.dispatch(logoutUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Получение данных пользователя', () => {
    const axiosMock = new MockAdapter(http);
    axiosMock.onGet(getUserApiUrl).reply(200, { success: true, user: fakeUser });

    const expectedActions = [
      { type: 'auth/userStartFetching', payload: undefined },
      { type: 'login/isDataTransfering', payload: undefined },
      {
        type: 'login/dataTransferCompletedSuccessfully',
        payload: undefined
      },
      { type: 'login/changeEmailFieldValue', payload: 'user@mail.ru' },
      { type: 'login/changeNameFieldValue', payload: 'User' },
      {
        type: 'auth/userFetched',
        payload: { success: true, user: fakeUser }
      }
    ];

    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'accessToken=665577',
    });

    const store = mockStore({ auth: initialState });
    return store.dispatch(getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Получение данных пользователя - если пользователь уже есть', () => {
    const expectedActions = [];
    const store = mockStore({ auth: { ...initialState, user: fakeUser } });
    return store.dispatch(getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Получение данных пользователя - если идет процес получения из другого потока', () => {
    const expectedActions = [];
    const store = mockStore({ auth: { ...initialState, isUserFetching: true } });
    return store.dispatch(getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Регистрация завершена - стейт', () => {
    expect(reducer(initialState, { type: 'auth/registerCompleted', payload: {user: fakeUser} })).toEqual({
      ...initialState,
      user: fakeUser
    });
  });

  it('Вход осуществлен - стейт', () => {
    expect(reducer(initialState, { type: 'auth/loginSuccessfullyCompleted', payload: {user: fakeUser} })).toEqual({
      ...initialState,
      user: fakeUser
    });
  });

  it('Пользователь обновлен - стейт', () => {
    expect(reducer(initialState, { type: 'auth/userUpdateSuccessfullyCompleted', payload: {user: fakeUser} })).toEqual({
      ...initialState,
      user: fakeUser
    });
  });

  it('Пользователь вышел - стейт', () => {
    expect(reducer(initialState, { type: 'auth/loggedOut'})).toEqual({
      ...initialState,
      user: null
    });
  });

  it('Токен обновлен - стейт', () => {
    expect(reducer(initialState, { type: 'auth/tokenRefreshed', payload: {accessToken: 'token'}})).toEqual({
      ...initialState,
    });
  });

  it('Пользователь получен - стейт', () => {
    expect(reducer(initialState, { type: 'auth/userFetched', payload: {user: fakeUser}})).toEqual({
      ...initialState,
      user: fakeUser
    });
  });

  it('Начало загрузки пользователя - стейт', () => {
    expect(reducer(initialState, { type: 'auth/userStartFetching'})).toEqual({
      ...initialState,
      isUserFetching: true
    });
  });

  it('Окончание загрузки пользователя - стейт', () => {
    expect(reducer(initialState, { type: 'auth/userCompletedFetchingWithError'})).toEqual({
      ...initialState,
      isUserFetching: false
    });
  });

});
