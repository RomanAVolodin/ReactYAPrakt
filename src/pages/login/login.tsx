import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import {
  changeEmailFieldError,
  changeEmailFieldValue,
  changePaswordFieldError,
  changePaswordFieldIcon,
  changePaswordFieldValue,
  proceedLogin,
} from '../../services/slices/login';

const LoginPage: React.FC = () => {
  const { email, password, isErrorWhileDataTransfer, isDataTransfering } = useSelector(
    (state: RootState) => state.login,
  );
  const dispatcher = useDispatch();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeEmailFieldValue(e.target.value));
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changePaswordFieldValue(e.target.value));
  };

  const passwordIconClick = () => {
    dispatcher(changePaswordFieldIcon());
  };

  const login = () => {
    if (!validator.isEmail(email.value)) {
      dispatcher(changeEmailFieldError('Ошибка в адресе почты'));
    }
    if (validator.isEmpty(email.value)) {
      dispatcher(changeEmailFieldError('Поле обязательно к заполнению'));
    }
    if (validator.isEmpty(password.value)) {
      dispatcher(changePaswordFieldError('Поле обязательно к заполнению'));
    }

    if (
      !validator.isEmail(email.value) ||
      validator.isEmpty(email.value) ||
      validator.isEmpty(password.value)
    ) {
      return;
    }
    dispatcher(proceedLogin());
  };

  return (
    <div className={styles.container}>
      <Logo />
      <p className="text text_type_main-medium mt-20">Вход</p>
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
      <Button type="primary" size="large" onClick={login}>
        {!isDataTransfering ? 'Войти' : 'Данные проверяются'}
      </Button>
      {isErrorWhileDataTransfer && (
        <p className="text text_type_main-default">При получении данных произошла ошибка</p>
      )}
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы - новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default LoginPage;