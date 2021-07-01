import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { loginSlice as slice, initialState, proceedPasswordResetRequest, proceedPasswordReset } from './login';
import fetchMock from 'fetch-mock';
import { passwordResetApiUrl, passwordResetRequestApiUrl } from '../../../utils/apiURLs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login slice', () => {
  const reducer = slice.reducer;

  afterEach(() => {
    fetchMock.restore();
  });

  it('Должен вернуть state по умолчанию', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Отправка запроса на смену пароля', () => {
    fetchMock.postOnce(passwordResetRequestApiUrl, {
      body: {success: true},
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      {
        type: 'login/dataTransferCompletedSuccessfully',
        payload: undefined
      }
    ];
    const store = mockStore({...initialState, login: {email: 'test@mail.ru'}});
    return store.dispatch(proceedPasswordResetRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Отправка запроса на смену пароля - ошибка', () => {
    fetchMock.postOnce(passwordResetRequestApiUrl, {
      body: {success: false},
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      { type: 'login/errorWhileDataTransfer', payload: undefined }
    ];
    const store = mockStore({...initialState, login: {email: 'test@mail.ru'}});
    return store.dispatch(proceedPasswordResetRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Смена пароля по коду и почте', () => {
    fetchMock.postOnce(passwordResetApiUrl, {
      body: {success: true},
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      {
        type: 'login/dataTransferCompletedSuccessfully',
        payload: undefined
      }
    ];
    const store = mockStore({...initialState, login: {verification_code: '123', password: '123'}});
    return store.dispatch(proceedPasswordReset()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Смена пароля по коду и почте - ошибка', () => {
    fetchMock.postOnce(passwordResetApiUrl, {
      body: {success: false},
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'login/isDataTransfering', payload: undefined },
      { type: 'login/errorWhileDataTransfer', payload: undefined }
    ];
    const store = mockStore({...initialState, login: {verification_code: '123', password: '123'}});
    return store.dispatch(proceedPasswordReset()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Изменение поля email - стейт', () => {
    expect(reducer(initialState, { type: 'login/changeEmailFieldValue', payload: 'mail@new.ru'})).toEqual({
      ...initialState,
      email: {...initialState.email, value: 'mail@new.ru', isError: false},
    });
  });

  it('Изменение поля password - стейт', () => {
    expect(reducer(initialState, { type: 'login/changePaswordFieldValue', payload: '123'})).toEqual({
      ...initialState,
      password: {...initialState.password, value: '123', isError: false},
    });
  });

  it('Изменение поля name - стейт', () => {
    expect(reducer(initialState, { type: 'login/changeNameFieldValue', payload: '123'})).toEqual({
      ...initialState,
      name: {...initialState.name, value: '123', isError: false},
    });
  });

  it('Изменение поля verification_code - стейт', () => {
    expect(reducer(initialState, { type: 'login/changeCodeFieldValue', payload: '123'})).toEqual({
      ...initialState,
      verification_code: {...initialState.verification_code, value: '123', isError: false},
    });
  });

  it('Изменение текста ошибки поля email - стейт', () => {
    expect(reducer(initialState, { type: 'login/changeEmailFieldError', payload: '123'})).toEqual({
      ...initialState,
      email: {...initialState.email, errorText: '123', isError: true},
    });
  });

  it('Изменение текста ошибки поля password - стейт', () => {
    expect(reducer(initialState, { type: 'login/changePaswordFieldError', payload: '123'})).toEqual({
      ...initialState,
      password: {...initialState.password, errorText: '123', isError: true},
    });
  });

  it('Изменение текста ошибки поля name - стейт', () => {
    expect(reducer(initialState, { type: 'login/changeNameFieldError', payload: '123'})).toEqual({
      ...initialState,
      name: {...initialState.name, errorText: '123', isError: true},
    });
  });

  it('Изменение текста ошибки поля verification_code - стейт', () => {
    expect(reducer(initialState, { type: 'login/changeCodeFieldError', payload: '123'})).toEqual({
      ...initialState,
      verification_code: {...initialState.verification_code, errorText: '123', isError: true},
    });
  });

  it('Изменение иконки и видимости поля password - стейт', () => {
    expect(reducer({...initialState, password: {...initialState.password, type: 'text'}}, { type: 'login/changePaswordFieldIcon'})).toEqual({
      ...initialState,
      password: {...initialState.password, type: 'password', icon: 'ShowIcon'},
    });
    expect(reducer({...initialState, password: {...initialState.password, type: 'password'}}, { type: 'login/changePaswordFieldIcon'})).toEqual({
      ...initialState,
      password: {...initialState.password, type: 'text', icon: 'HideIcon'},
    });
  });

  it('Данные переданы - стейт', () => {
    expect(reducer(initialState, { type: 'login/dataTransferCompletedSuccessfully'})).toEqual({
      ...initialState,
      isDataTransfering: false,
      isErrorWhileDataTransfer: false,
      isDataTransferingCompleted: true
    });
  });

  it('switchOffDataTransferStatus - стейт', () => {
    expect(reducer(initialState, { type: 'login/switchOffDataTransferStatus'})).toEqual({
      ...initialState,
      isDataTransferingCompleted: false
    });
  });

  it('Данные передаются - стейт', () => {
    expect(reducer(initialState, { type: 'login/isDataTransfering'})).toEqual({
      ...initialState,
      isDataTransfering: true,
      isErrorWhileDataTransfer: false,
      isDataTransferingCompleted: false
    });
  });

  it('Данные передались с ошибкой - стейт', () => {
    expect(reducer(initialState, { type: 'login/errorWhileDataTransfer'})).toEqual({
      ...initialState,
      isDataTransfering: false,
      isErrorWhileDataTransfer: true,
      isDataTransferingCompleted: true
    });
  });

});