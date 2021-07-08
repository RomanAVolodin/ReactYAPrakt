import React, { useEffect, useState } from 'react';
import { getUser } from '../services/slices/auth/auth';
import { Route, Redirect, useHistory, RouteProps } from 'react-router-dom';
import { TRootState } from '../services/reducers';
import { useDispatch, useSelector } from '../utils/hooks';

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user, isUserFetching } = useSelector((state: TRootState) => state.auth);
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const history = useHistory();

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
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
