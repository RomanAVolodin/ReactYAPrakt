import { User } from '../../models/user';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { toast } from 'react-toastify';
import { changeEmailFieldValue, changeNameFieldValue, loginSlice } from './login';
import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
  registerRequest,
  updateUserRequest,
} from '../../utils/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, removeFromLocalStorage, saveToLocalStorage, setCookie } from '../../utils/utils';


interface AuthStateType  {
  user: User | null
  accessToken?: string
  refreshToken?: string
}

const initialState: AuthStateType = {
  user: null
}

export const registerUser = (user: User) => (dispatch: Dispatch, getState: () => RootState) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;

  const { registerCompleted } = authSlice.actions;

  dispatch(isDataTransfering());
  registerRequest(user)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message ? data.message : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      dispatch(registerCompleted(data));
      toast.success('Регистрация прошла успешно');
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

export const loginUser = (user: User, cb: CallableFunction) => (dispatch: Dispatch) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;

  const { loginSuccessfullyCompleted } = authSlice.actions;

  dispatch(isDataTransfering());
  loginRequest(user)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message ? data.message : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      dispatch(loginSuccessfullyCompleted(data));
      cb();
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

export const updateUser = (user: User) => (dispatch: Dispatch) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;

  const { userUpdateSuccessfullyCompleted } = authSlice.actions;

  dispatch(isDataTransfering());
  updateUserRequest(user)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message ? data.message : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      dispatch(userUpdateSuccessfullyCompleted(data));
      toast.success('Данные обновлены');
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

export const logoutUser = () => (dispatch: Dispatch) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;

  const { loggedOut } = authSlice.actions;

  dispatch(isDataTransfering());
  logoutRequest()
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message ? data.message : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      dispatch(loggedOut());
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

export const refreshToken = () => (dispatch: Dispatch) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;

  const { tokenRefreshed } = authSlice.actions;

  dispatch(isDataTransfering());
  refreshTokenRequest()
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message ? data.message : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      dispatch(tokenRefreshed(data));
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

export const getUser = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;

  const { userFetched } = authSlice.actions;
  const user = getState().auth.user;

  if (user || (!user && !getCookie('accessToken'))) return new Promise<void>((resolve, reject) => {
    resolve();
  });

  dispatch(isDataTransfering());
  return getUserRequest()
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message ? data.message : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      dispatch(changeEmailFieldValue(data.user.email));
      dispatch(changeNameFieldValue(data.user.name));
      dispatch(userFetched(data));
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

const getTokenFromPayload = (payload?: string) => {
  return payload &&  payload.indexOf('Bearer') === 0 ? payload.split('Bearer ')[1] : payload
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerCompleted(state, action: PayloadAction<AuthStateType>) {
      state.user = action.payload.user;
      setCookie('accessToken', getTokenFromPayload(action.payload.accessToken));
      saveToLocalStorage('refreshToken', action.payload.refreshToken);
    },
    loginSuccessfullyCompleted(state, action: PayloadAction<AuthStateType>) {
      state.user = action.payload.user;
      setCookie('accessToken', getTokenFromPayload(action.payload.accessToken));
      saveToLocalStorage('refreshToken', action.payload.refreshToken);
    },
    userUpdateSuccessfullyCompleted(state, action: PayloadAction<AuthStateType>) {
      state.user = action.payload.user;
    },
    loggedOut(state) {
      state.user = null;
      deleteCookie('accessToken');
      removeFromLocalStorage('refreshToken');
    },
    tokenRefreshed(state, action: PayloadAction<AuthStateType>) {
      setCookie('accessToken', getTokenFromPayload(action.payload.accessToken));
      saveToLocalStorage('refreshToken', action.payload.refreshToken);
    },
    userFetched(state, action: PayloadAction<AuthStateType>) {
      state.user = action.payload.user;
    },
  },
});
