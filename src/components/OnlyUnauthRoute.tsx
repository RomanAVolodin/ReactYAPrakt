import { Route, Redirect, useHistory, RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../services/reducers';
import React, { useEffect, useState } from 'react';
import { getUser } from '../services/slices/auth/auth';

export const OnlyUnauthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user, isUserFetching } = useSelector((state: TRootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await dispatch(getUser());
    };
    init().then(() => setUserLoaded(true));
  }, [dispatch, history]);

  if (!isUserLoaded || isUserFetching) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};
