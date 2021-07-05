import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/slices/auth/auth';

export const ProfileMainPage: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const logOut = (): void => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <div className="mb-10">
          <NavLink
            to="/profile"
            exact
            className="link text text_type_main-default text_color_inactive"
            activeClassName="text_color_active"
          >
            Профиль
          </NavLink>
        </div>
        <div className="mb-10">
          <NavLink
            to="/profile/orders"
            className="link text text_type_main-default text_color_inactive"
            activeClassName="text_color_active"
          >
            История заказов
          </NavLink>
        </div>
        <div className="mb-10">
          <p
            onClick={logOut}
            className="link text text_type_main-default text_color_inactive cursor_pointer"
          >
            Выход
          </p>
        </div>
        <p className="text text_type_main-small text_color_inactive opacity_04">
          В этом разделе Вы можете <br />
          изменить свои персональные данные
        </p>
      </div>
      <div className={styles.profile_inner_container}>{children}</div>
    </div>
  );
};
