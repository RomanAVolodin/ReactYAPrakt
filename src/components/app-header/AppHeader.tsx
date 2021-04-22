import React from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./AppHeader.module.css";
import LogoSmall from "../../images/logo.svg";
import MobileMenuOpener from "../../images/mobile_menu_opener.svg";

class AppHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className={[
            headerStyles.container,
            headerStyles.desktop_header,
            "text text_type_main-default",
          ].join(" ")}
        >
          <ul className={headerStyles.menu_desktop}>
            <li className={headerStyles.menu_item}>
              <BurgerIcon type="primary" />
              <span className="ml-1">Конструктор</span>
            </li>
            <li className={headerStyles.menu_item}>
              <ListIcon type="primary" />
              <span className="ml-1">Лента заказов</span>
            </li>
          </ul>

          <Logo />

          <ul className={headerStyles.menu_desktop}>
            <li className={headerStyles.menu_item}>
              <ProfileIcon type="primary" />
              <span className="ml-1">Личный кабинет</span>
            </li>
          </ul>
        </div>
        <div
          className={[
            headerStyles.container,
            headerStyles.mobile_header,
            "text text_type_main-default mobile_header pr-1 pl-1",
          ].join(" ")}
        >
          <img src={LogoSmall} alt="" />
          <img src={MobileMenuOpener} alt="" />
        </div>
      </>
    );
  }
}

export default AppHeader;
