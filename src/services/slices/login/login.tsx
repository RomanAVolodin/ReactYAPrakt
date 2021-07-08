import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CodeFieldInitialState,
  EmailFieldInitialState,
  NameFieldInitialState,
  PasswordFieldInitialState,
} from '../../../utils/initial-states';
import { Reducer } from 'redux';
import { toast } from 'react-toastify';
import { TRootState } from '../../reducers';
import { doPasswordResetRequest, passwordResetRequest } from '../../../utils/api';
import { TAppDispatch } from '../../types/app-dispatch';
import { TLoginSliceActionsType, TLoginStateType } from './types';


export const initialState: TLoginStateType = {
  email: EmailFieldInitialState,
  password: PasswordFieldInitialState,
  name: NameFieldInitialState,
  verification_code: CodeFieldInitialState,
  isDataTransfering: false,
  isDataTransferingCompleted: false,
  isErrorWhileDataTransfer: false,
};

export const proceedPasswordResetRequest = () => (
  dispatch: TAppDispatch,
  getState: () => TRootState,
) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;
  const { email } = getState().login;

  dispatch(isDataTransfering());
  return passwordResetRequest(email.value)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.error ? data.error : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      toast.success('На указанный Вами email отправлено письмо с инструкцией');
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

export const proceedPasswordReset = () => (dispatch: TAppDispatch, getState: () => TRootState) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;
  const { password, verification_code } = getState().login;

  dispatch(isDataTransfering());
  return doPasswordResetRequest(password.value, verification_code.value)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message ? data.message : 'Ошибка получения данных');
      }
      dispatch(dataTransferCompletedSuccessfully());
      toast.success('Пароль успешно изменен');
    })
    .catch((err) => {
      dispatch(errorWhileDataTransfer());
      toast.error(err.message);
    });
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeEmailFieldValue(state: TLoginStateType, action: PayloadAction<string>): void {
      state.email.value = action.payload;
      state.email.isError = false;
    },
    changePaswordFieldValue(state: TLoginStateType, action: PayloadAction<string>): void {
      state.password.value = action.payload;
      state.password.isError = false;
    },
    changeNameFieldValue(state: TLoginStateType, action: PayloadAction<string>): void {
      state.name.value = action.payload;
      state.name.isError = false;
    },
    changeCodeFieldValue(state: TLoginStateType, action: PayloadAction<string>): void {
      state.verification_code.value = action.payload;
      state.verification_code.isError = false;
    },
    changeEmailFieldError(state: TLoginStateType, action: PayloadAction<string>): void {
      state.email.errorText = action.payload;
      state.email.isError = true;
    },
    changePaswordFieldError(state: TLoginStateType, action: PayloadAction<string>): void {
      state.password.errorText = action.payload;
      state.password.isError = true;
    },
    changeNameFieldError(state: TLoginStateType, action: PayloadAction<string>): void {
      state.name.errorText = action.payload;
      state.name.isError = true;
    },
    changeCodeFieldError(state: TLoginStateType, action: PayloadAction<string>): void {
      state.verification_code.errorText = action.payload;
      state.verification_code.isError = true;
    },
    changePaswordFieldIcon(state: TLoginStateType): void {
      if (state.password.type === 'password') {
        state.password.type = 'text';
        state.password.icon = 'HideIcon';
      } else {
        state.password.type = 'password';
        state.password.icon = 'ShowIcon';
      }
    },
    dataTransferCompletedSuccessfully(state: TLoginStateType): void {
      state.isDataTransfering = false;
      state.isErrorWhileDataTransfer = false;
      state.isDataTransferingCompleted = true;
    },
    switchOffDataTransferStatus(state: TLoginStateType): void {
      state.isDataTransferingCompleted = false;
    },
    isDataTransfering(state: TLoginStateType): void {
      state.isDataTransfering = true;
      state.isErrorWhileDataTransfer = false;
      state.isDataTransferingCompleted = false;
    },
    errorWhileDataTransfer(state: TLoginStateType): void {
      state.isDataTransfering = false;
      state.isErrorWhileDataTransfer = true;
      state.isDataTransferingCompleted = true;
    },
  },
});

export const {
  changeEmailFieldValue,
  changePaswordFieldValue,
  changePaswordFieldIcon,
  isDataTransfering,
  errorWhileDataTransfer,
  changeEmailFieldError,
  changePaswordFieldError,
  changeNameFieldValue,
  changeCodeFieldValue,
  changeNameFieldError,
  changeCodeFieldError,
  switchOffDataTransferStatus,
} = loginSlice.actions;

export const loginSliceReducer = loginSlice.reducer as Reducer<
  TLoginStateType,
  TLoginSliceActionsType
  >;