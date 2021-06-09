import React, { ChangeEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../login/login.module.css';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import {
  changeEmailFieldError,
  changeEmailFieldValue,
  changeNameFieldError,
  changeNameFieldValue,
  changePaswordFieldError,
  changePaswordFieldIcon,
  changePaswordFieldValue,
  switchOffDataTransferStatus,
} from '../../services/slices/login';
import { User } from '../../models/user';
import { registerUser } from '../../services/slices/auth';

const RegisterPage: React.FC = () => {
  const {
    email,
    password,
    name,
    isErrorWhileDataTransfer,
    isDataTransfering,
    isDataTransferingCompleted,
  } = useSelector((state: RootState) => state.login);

  const dispatcher = useDispatch();
  const history = useHistory();


  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeEmailFieldValue(e.target.value));
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changePaswordFieldValue(e.target.value));
  };

  const passwordIconClick = () => {
    dispatcher(changePaswordFieldIcon());
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeNameFieldValue(e.target.value));
  };

  const register = () => {
    if (!validator.isEmail(email.value)) {
      dispatcher(changeEmailFieldError('Ошибка в адресе почты'));
    }
    if (validator.isEmpty(email.value)) {
      dispatcher(changeEmailFieldError('Поле обязательно к заполнению'));
    }
    if (validator.isEmpty(password.value)) {
      dispatcher(changePaswordFieldError('Поле обязательно к заполнению'));
    }
    if (validator.isEmpty(name.value)) {
      dispatcher(changeNameFieldError('Поле обязательно к заполнению'));
    }

    if (
      !validator.isEmail(email.value) ||
      validator.isEmpty(email.value) ||
      validator.isEmpty(password.value) ||
      validator.isEmpty(name.value)
    ) {
      return;
    }
    const user:User = {
      email: email.value,
      password: password.value,
      name: name.value,
    }
    dispatcher(registerUser(user));
  };

  useEffect(() => {
    if (isDataTransferingCompleted) {
      history.replace('/login');
    }
  }, [isDataTransferingCompleted, history]);

  useEffect(() => {
    dispatcher(switchOffDataTransferStatus());
  }, [dispatcher]);

  return (
    <div className={styles.container}>
      <Logo />
      <p className="text text_type_main-medium mt-20">Регистрация</p>
      <Input
        type={name.type}
        placeholder={name.placeholder}
        onChange={onChangeName}
        value={name.value}
        name={name.name}
        error={name.isError}
        errorText={name.errorText}
        size={'default'}
      />
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
      <Button type="primary" size="large" onClick={register}>
        {!isDataTransfering ? 'Зарегистрироваться' : 'Данные отправляются'}
      </Button>
      {isErrorWhileDataTransfer && (
        <p className="text text_type_main-default">При отправке данных произошла ошибка</p>
      )}
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
