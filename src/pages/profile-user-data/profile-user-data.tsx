import React, { ChangeEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeEmailFieldValue, changeNameFieldValue, changePaswordFieldValue } from '../../services/slices/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

export const ProfileUserData: React.FC = () => {
  const {
    email,
    password,
    name,
  } = useSelector((state: RootState) => state.login);

  const dispatcher = useDispatch();


  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeNameFieldValue(e.target.value));
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeEmailFieldValue(e.target.value));
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changePaswordFieldValue(e.target.value));
  };

  return (
    <div>
      <div className="mb-3">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChangeName}
          icon={'EditIcon'}
          value={name.value}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-3">
        <Input
          type={'text'}
          placeholder={'Логин'}
          onChange={onChangeEmail}
          icon={'EditIcon'}
          value={email.value}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-3">
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={onChangePassword}
          icon={'EditIcon'}
          value={password.value}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
    </div>
  );
}