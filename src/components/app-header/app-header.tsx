import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';
import LogoSmall from '../../images/logo.svg';
import MobileMenuOpener from '../../images/mobile_menu_opener.svg';

const AppHeader: React.FC = () => {
  return (
    <header>
      <nav
        className={[
          headerStyles.container,
          headerStyles.desktop_header,
          'text text_type_main-default',
        ].join(' ')}
      >
        <ul className={headerStyles.menu_desktop}>
          <li className={headerStyles.menu_item} >
            <NavLink
              data-testid="constructor-link"
              exact
              to="/"
              className="link text text_type_main-default text_color_inactive"
              activeClassName="text_color_active"
            >
              <BurgerIcon type="primary" />
              <span className="ml-1">Конструктор</span>
            </NavLink>
          </li>
          <li className={headerStyles.menu_item}>
            <NavLink
              data-testid="feed-link"
              to="/feed"
              className="link text text_type_main-default text_color_inactive"
              activeClassName="text_color_active"
            >
              <ListIcon type="primary" />
              <span className="ml-1">Лента заказов</span>
            </NavLink>
          </li>
        </ul>

        <Logo />

        <ul className={headerStyles.menu_desktop}>
          <li className={headerStyles.menu_item}>
            <NavLink
              data-testid="cabinet-link"
              to="/profile"
              className="link text text_type_main-default text_color_inactive"
              activeClassName="text_color_active"
            >
              <ProfileIcon type="primary" />
              <span className="ml-1">Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav
        className={[
          headerStyles.container,
          headerStyles.mobile_header,
          'text text_type_main-default mobile_header pr-1 pl-1',
        ].join(' ')}
      >
        <img src={LogoSmall} alt="" />
        <img src={MobileMenuOpener} alt="" />
      </nav>
    </header>
  );
};

export default AppHeader;
