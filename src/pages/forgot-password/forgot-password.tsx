import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from '../login/login.module.css';

import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import {
  changeEmailFieldError,
  changeEmailFieldValue,
  proceedPasswordResetRequest,
  switchOffDataTransferStatus,
} from '../../services/slices/login/login';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPasswordPage: React.FC = () => {
  const {
    email,
    isErrorWhileDataTransfer,
    isDataTransfering,
    isDataTransferingCompleted,
  } = useSelector((state: RootState) => state.login);
  const dispatcher = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeEmailFieldValue(e.target.value));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validator.isEmail(email.value)) {
      dispatcher(changeEmailFieldError('Ошибка в адресе почты'));
    }
    if (validator.isEmpty(email.value)) {
      dispatcher(changeEmailFieldError('Поле обязательно к заполнению'));
    }

    if (!validator.isEmail(email.value) || validator.isEmpty(email.value)) {
      return;
    }

    dispatcher(proceedPasswordResetRequest());
  };

  useEffect(() => {
    if (isDataTransferingCompleted) {
      dispatcher(switchOffDataTransferStatus());
      history.replace({ pathname: '/reset-password', state: { from: location } });
    }
  }, [isDataTransferingCompleted, history, location, dispatcher]);

  return (
    <div className={styles.container}>
      <Logo />
      <p className="text text_type_main-medium mt-20">Восстановление пароля</p>
      <form onSubmit={handleSubmit}>
        <Input
          type={email.type}
          placeholder={email.placeholder}
          onChange={onChangeEmail}
          value={email.value}
          name={email.name}
          error={email.isError}
          errorText={email.errorText}
          size={'default'}
        />
        <Button type="primary" size="large">
          {!isDataTransfering ? 'Восстановить' : 'Данные отправляются'}
        </Button>
      </form>
      {isErrorWhileDataTransfer && (
        <p className="text text_type_main-default">При отправке данных произошла ошибка</p>
      )}
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
