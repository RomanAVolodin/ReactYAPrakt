import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CodeFieldInitialState,
  EmailFieldInitialState,
  NameFieldInitialState,
  PasswordFieldInitialState,
} from '../../utils/initial-states';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { RootState } from '../reducers';
import { doPasswordResetRequest, passwordResetRequest } from '../../utils/api';

const initialState = {
  email: EmailFieldInitialState,
  password: PasswordFieldInitialState,
  name: NameFieldInitialState,
  verification_code: CodeFieldInitialState,
  isDataTransfering: false,
  isDataTransferingCompleted: false,
  isErrorWhileDataTransfer: false,
};

export const proceedPasswordResetRequest = () => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;
  const { email } = getState().login;

  dispatch(isDataTransfering());
  passwordResetRequest(email.value)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Произошла ошибка сети');
      }
      return resp.json();
    })
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

export const proceedPasswordReset = () => (dispatch: Dispatch, getState: () => RootState) => {
  const {
    dataTransferCompletedSuccessfully,
    isDataTransfering,
    errorWhileDataTransfer,
  } = loginSlice.actions;
  const { password, verification_code } = getState().login;

  dispatch(isDataTransfering());
  doPasswordResetRequest(password.value, verification_code.value)
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
    changeEmailFieldValue(state, action: PayloadAction<string>) {
      state.email.value = action.payload;
      state.email.isError = false;
    },
    changePaswordFieldValue(state, action: PayloadAction<string>) {
      state.password.value = action.payload;
      state.password.isError = false;
    },
    changeNameFieldValue(state, action: PayloadAction<string>) {
      state.name.value = action.payload;
      state.name.isError = false;
    },
    changeCodeFieldValue(state, action: PayloadAction<string>) {
      state.verification_code.value = action.payload;
      state.verification_code.isError = false;
    },
    changeEmailFieldError(state, action: PayloadAction<string>) {
      state.email.errorText = action.payload;
      state.email.isError = true;
    },
    changePaswordFieldError(state, action: PayloadAction<string>) {
      state.password.errorText = action.payload;
      state.password.isError = true;
    },
    changeNameFieldError(state, action: PayloadAction<string>) {
      state.name.errorText = action.payload;
      state.name.isError = true;
    },
    changeCodeFieldError(state, action: PayloadAction<string>) {
      state.verification_code.errorText = action.payload;
      state.verification_code.isError = true;
    },
    changePaswordFieldIcon(state) {
      if (state.password.type === 'password') {
        state.password.type = 'text';
        state.password.icon = 'HideIcon';
      } else {
        state.password.type = 'password';
        state.password.icon = 'ShowIcon';
      }
    },
    dataTransferCompletedSuccessfully(state) {
      state.isDataTransfering = false;
      state.isErrorWhileDataTransfer = false;
      state.isDataTransferingCompleted = true;
    },
    switchOffDataTransferStatus(state) {
      state.isDataTransferingCompleted = false;
    },
    isDataTransfering(state) {
      state.isDataTransfering = true;
      state.isErrorWhileDataTransfer = false;
      state.isDataTransferingCompleted = false;
    },
    errorWhileDataTransfer(state) {
      state.isDataTransfering = false;
      state.isErrorWhileDataTransfer = true;
      state.isDataTransferingCompleted = false;
    },
  },
});

export const {
  changeEmailFieldValue,
  changePaswordFieldValue,
  changePaswordFieldIcon,
  dataTransferCompletedSuccessfully,
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
