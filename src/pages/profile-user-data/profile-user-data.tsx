import React, { ChangeEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  changeEmailFieldValue,
  changeNameFieldValue,
  changePaswordFieldValue,
} from '../../services/slices/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { updateUser } from '../../services/slices/auth';

export const ProfileUserData: React.FC = () => {
  const {
    email,
    password,
    name,
    isDataTransfering,
    isErrorWhileDataTransfer
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

  const proceedUpdateUser = () => {
    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
    }
    dispatcher(updateUser(user));
  }

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
      <Button type="primary" size="large" onClick={proceedUpdateUser}>
        {!isDataTransfering ? 'Сохранить' : 'Данные отправляются'}
      </Button>
      {isErrorWhileDataTransfer && (
        <p className="text text_type_main-default">При получении данных произошла ошибка</p>
      )}
    </div>
  );
}