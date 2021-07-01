import React, { ChangeEvent, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from '../login/login.module.css';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import {
  changeCodeFieldError,
  changeCodeFieldValue,
  changePaswordFieldError,
  changePaswordFieldIcon,
  changePaswordFieldValue,
  proceedPasswordReset,
} from '../../services/slices/login/login';
import { LocationState } from '../../models/location-state';

const ResetPasswordPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { from } = location.state ? (location.state as LocationState) : { from: null };
    if (from?.pathname !== '/forgot-password') {
      history.replace({ pathname: '/forgot-password' });
    }
  }, [history, location.state]);

  const {
    password,
    verification_code,
    isErrorWhileDataTransfer,
    isDataTransfering,
    isDataTransferingCompleted,
  } = useSelector((state: RootState) => state.login);
  const dispatcher = useDispatch();

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changePaswordFieldValue(e.target.value));
  };

  const passwordIconClick = () => {
    dispatcher(changePaswordFieldIcon());
  };

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeCodeFieldValue(e.target.value));
  };

  const resetPassword = () => {
    if (validator.isEmpty(password.value)) {
      dispatcher(changePaswordFieldError('Поле обязательно к заполнению'));
    }
    if (validator.isEmpty(verification_code.value)) {
      dispatcher(changeCodeFieldError('Поле обязательно к заполнению'));
    }

    if (validator.isEmpty(password.value) || validator.isEmpty(verification_code.value)) {
      return;
    }

    dispatcher(proceedPasswordReset());
  };

  useEffect(() => {
    if (isDataTransferingCompleted) {
      history.replace('/login');
    }
  }, [isDataTransferingCompleted, history]);

  return (
    <div className={styles.container}>
      <Logo />
      <p className="text text_type_main-medium mt-20">Восстановление пароля</p>
      <Input
        type={password.type}
        placeholder={password.placeholder}
        onChange={onChangePassword}
        value={password.value}
        name={password.name}
        error={password.isError}
        errorText={password.errorText}
        size={'default'}
        icon={password.icon}
        onIconClick={passwordIconClick}
      />
      <Input
        type={verification_code.type}
        placeholder={verification_code.placeholder}
        onChange={onChangeCode}
        value={verification_code.value}
        name={verification_code.name}
        error={verification_code.isError}
        errorText={verification_code.errorText}
        size={'default'}
      />
      <Button type="primary" size="large" onClick={resetPassword}>
        {!isDataTransfering ? 'Сохранить' : 'Данные отправляются'}
      </Button>
      {isErrorWhileDataTransfer && (
        <p className="text text_type_main-default">При отправке данных произошла ошибка</p>
      )}
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
