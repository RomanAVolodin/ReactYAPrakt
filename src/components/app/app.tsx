import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getIngredients } from '../../services/slices/ingredients/ingredients';
import {
  Feed,
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFound404,
  RegisterPage,
  ResetPasswordPage,
  OrderDetailedPage,
  ProfileMainPage,
  ProfileUserData,
  ProfileOrdersHistory,
} from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute';
import { OnlyUnauthRoute } from '../OnlyUnauthRoute';
import { TLocationState } from '../../models/location-state';
import Modal from '../modal-window/modal';
import IngredientDetails from '../../pages/ingredient-detailed/ingredient-details';
import ClearHistoryStateComponent from '../clear-history-state/clear-history-state';
import { createBrowserHistory } from 'history';
import { getUser } from '../../services/slices/auth/auth';
import { useDispatch } from '../../utils/hooks';

export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Router history={history}>
        <ClearHistoryStateComponent />
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route
            path="/ingredients/:id"
            exact={true}
            render={({ location, history, match }) => {
              const { from } = location.state ? (location.state as TLocationState) : { from: null };
              if (from?.pathname === '/') {
                return (
                  <>
                    <MainPage />
                    <Modal
                      title="Детали ингредиента"
                      show={true}
                      onCloseClick={() => history.goBack()}
                    >
                      <IngredientDetails />
                    </Modal>
                  </>
                );
              }
              return <IngredientDetails />;
            }}
          />
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
          <Route
            path="/feed/:order_id"
            exact={true}
            render={({ location, history, match }) => {
              const { from } = location.state ? (location.state as TLocationState) : { from: null };
              if (from?.pathname === '/feed') {
                return (
                  <>
                    <Feed />
                    <Modal
                      title={`#${match.params.order_id}`}
                      show={true}
                      onCloseClick={() => history.goBack()}
                    >
                      <OrderDetailedPage />
                    </Modal>
                  </>
                );
              }
              return <OrderDetailedPage />;
            }}
          />
          <ProtectedRoute path="/profile">
            <ProfileMainPage>
              <Switch>
                <Route path="/profile" exact={true}>
                  <ProfileUserData />
                </Route>
                <Route path="/profile/orders" exact={true}>
                  <ProfileOrdersHistory />
                </Route>
                <Route
                  path="/profile/orders/:order_id"
                  exact={true}
                  render={({ location, history, match }) => {
                    const { from } = location.state
                      ? (location.state as TLocationState)
                      : { from: null };
                    if (from?.pathname === '/profile/orders') {
                      return (
                        <>
                          <ProfileOrdersHistory />
                          <Modal
                            title={`#${match.params.order_id}`}
                            show={true}
                            onCloseClick={() => history.goBack()}
                          >
                            <OrderDetailedPage />
                          </Modal>
                        </>
                      );
                    }
                    return <OrderDetailedPage />;
                  }}
                />
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
