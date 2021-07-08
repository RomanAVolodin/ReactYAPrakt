import { IInputFieldStateType } from '../models/input-field-state-type';

export const EmailFieldInitialState: IInputFieldStateType = {
  type: 'email',
  value: '',
  name: 'email',
  placeholder: 'E-mail',
  isError: false,
};
export const PasswordFieldInitialState: IInputFieldStateType = {
  type: 'password',
  value: '',
  name: 'password',
  placeholder: 'Пароль',
  isError: false,
  icon: 'ShowIcon',
};
export const NameFieldInitialState: IInputFieldStateType = {
  type: 'text',
  value: '',
  name: 'name',
  placeholder: 'Имя',
  isError: false,
};

export const CodeFieldInitialState: IInputFieldStateType = {
  type: 'text',
  value: '',
  name: 'code',
  placeholder: 'Введите код из письма',
  isError: false,
};
