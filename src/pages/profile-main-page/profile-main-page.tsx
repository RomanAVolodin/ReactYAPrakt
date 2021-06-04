import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import styles from './profile.module.css';
import { ProfileUserData } from '../profile-user-data/profile-user-data';
import { ProfileOrdersHistory, OrderDetailedPage } from '../index';


export const ProfileMainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <div className="mb-10">
          <NavLink to="/profile"
                   exact
                   className="link text text_type_main-default text_color_inactive"
                   activeClassName="text_color_active">
            Профиль
          </NavLink>
        </div>
        <div className="mb-10">
          <NavLink to="/profile/orders"
                   className="link text text_type_main-default text_color_inactive"
                   activeClassName="text_color_active">
            История заказов
          </NavLink>
        </div>
        <div className="mb-10">
          <NavLink to="/profile/exit"
                   exact
                   className="link text text_type_main-default text_color_inactive"
                   activeClassName="text_color_active">
            Выход
          </NavLink>
        </div>
        <p className="text text_type_main-small text_color_inactive opacity_04">
          В этом разделе Вы можете <br/>изменить свои персональные данные
        </p>
      </div>
      <div className={styles.profile_inner_container}>
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileUserData />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <ProfileOrdersHistory />
          </Route>
          <Route path="/profile/orders/:order_id" exact={true}>
            <OrderDetailedPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}