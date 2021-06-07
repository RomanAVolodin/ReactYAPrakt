import { InputFieldStateType } from '../models/input-field-state-type';

export const EmailFieldInitialState: InputFieldStateType = {
  type: 'email',
  value: '',
  name: 'email',
  placeholder: 'E-mail',
  isError: false,
};
export const PasswordFieldInitialState: InputFieldStateType = {
  type: 'password',
  value: '',
  name: 'password',
  placeholder: 'Пароль',
  isError: false,
  icon: 'ShowIcon',
};
export const NameFieldInitialState: InputFieldStateType = {
  type: 'text',
  value: '',
  name: 'name',
  placeholder: 'Имя',
  isError: false,
};

export const CodeFieldInitialState: InputFieldStateType = {
  type: 'text',
  value: '',
  name: 'code',
  placeholder: 'Введите код из письма',
  isError: false,
};
