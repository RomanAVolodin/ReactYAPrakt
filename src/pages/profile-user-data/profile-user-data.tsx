import React, { ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  changeEmailFieldValue,
  changeNameFieldValue,
  changePaswordFieldValue,
} from '../../services/slices/login/login';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../services/reducers';
import { updateUser } from '../../services/slices/auth/auth';
import styles from './profile-user-data.module.css';

export const ProfileUserData: React.FC = () => {
  const { email, password, name, isDataTransfering, isErrorWhileDataTransfer } = useSelector(
    (state: TRootState) => state.login,
  );

  const user = useSelector((state: TRootState) => state.auth.user);
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

  const cancelInput = useCallback(() => {
    if (user) {
      dispatcher(changeEmailFieldValue(user.email));
      if (user.name) {
        dispatcher(changeNameFieldValue(user.name));
      }
    }
  }, [dispatcher, user]);

  useEffect(() => {
    cancelInput();
  }, [cancelInput]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    dispatcher(updateUser(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input_container_full_width mb-3">
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
      <div className="input_container_full_width mb-3">
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
      <div className="input_container_full_width mb-3">
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
      <div className={styles.cancel_submit}>
        <div className="mr-5 cursor_pointer text_success_color" onClick={cancelInput}>
          Отмена
        </div>
        <Button type="primary" size="medium">
          {!isDataTransfering ? 'Сохранить' : 'Данные отправляются'}
        </Button>
      </div>

      {isErrorWhileDataTransfer && (
        <p className="text text_type_main-default">При получении данных произошла ошибка</p>
      )}
    </form>
  );
};
