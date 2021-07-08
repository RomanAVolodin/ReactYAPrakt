import React, { ChangeEvent, FormEvent } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './login.module.css';
import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import validator from 'validator';
import { TRootState } from '../../services/reducers';
import {
  changeEmailFieldError,
  changeEmailFieldValue,
  changePaswordFieldError,
  changePaswordFieldIcon,
  changePaswordFieldValue,
} from '../../services/slices/login/login';
import { loginUser } from '../../services/slices/auth/auth';
import { IUser } from '../../models/user';
import { TLocationState } from '../../models/location-state';
import { useDispatch, useSelector } from '../../utils/hooks';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatcher = useDispatch();
  const { email, password, isErrorWhileDataTransfer, isDataTransfering } = useSelector(
    (state: TRootState) => state.login,
  );

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changeEmailFieldValue(e.target.value));
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatcher(changePaswordFieldValue(e.target.value));
  };
  const passwordIconClick = () => {
    dispatcher(changePaswordFieldIcon());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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
    const user: IUser = {
      email: email.value,
      password: password.value,
    };
    const customLocation = location.state as TLocationState;
    dispatcher(
      loginUser(user, () => {
        history.replace(
          customLocation && customLocation.from ? customLocation.from : { pathname: '/' },
        );
      }),
    );
  };

  return (
    <div className={styles.container}>
      <Logo />
      <p className="text text_type_main-medium mt-20">Вход</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
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
        </div>
        <Button type="primary" size="large">
          {!isDataTransfering ? 'Войти' : 'Данные проверяются'}
        </Button>
      </form>

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
