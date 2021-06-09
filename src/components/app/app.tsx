import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredients';
import {
  Feed,
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFound404,
  RegisterPage,
  ResetPasswordPage,
  OrderDetailedPage,
  ProfileMainPage, ProfileUserData, ProfileOrdersHistory,
} from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute';
import { OnlyUnauthRoute } from '../OnlyUnauthRoute';
import { LocationState } from '../../models/location-state';
import Modal from '../modal-window/modal';


function App() {
  const dispatch = useDispatch();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const closeModalRoute = () => {
    // history.push(location.state)
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <OnlyUnauthRoute path="/login" exact={true}>
            <LoginPage />
          </OnlyUnauthRoute>
          <OnlyUnauthRoute path="/register" exact={true}>
            <RegisterPage />
          </OnlyUnauthRoute>
          <OnlyUnauthRoute path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </OnlyUnauthRoute>
          <OnlyUnauthRoute path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </OnlyUnauthRoute>
          <Route path="/feed" exact={true}>
            <Feed />
          </Route>
          <Route path="/feed/:order_id" exact={true}>
            <OrderDetailedPage />
          </Route>
          <ProtectedRoute path="/profile" >
            <ProfileMainPage>
              <Switch>
                <Route path="/profile" exact={true}>
                  <ProfileUserData />
                </Route>
                <Route path="/profile/orders" exact={true}>
                  <ProfileOrdersHistory />
                </Route>
                <Route path="/profile/orders/:order_id" exact={true} render={ ({location, match}) => {
                  if (location && location.state) {
                    const { from } = location.state as LocationState;
                    if (from.pathname === '/profile/orders') {
                      return (
                        <Modal title="Детали ингредиента" show={true} onCloseClick={closeModalRoute}>
                          <OrderDetailedPage />
                        </Modal>
                      )
                    }
                  }

                  return (<OrderDetailedPage />)
                }}>
                </Route>
              </Switch>
            </ProfileMainPage>
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
