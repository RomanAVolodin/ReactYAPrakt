import { useEffect, useState } from 'react';
import { getUser } from '../services/slices/auth';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/reducers';

export function ProtectedRoute({ children, ...rest }: any) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      await dispatch(getUser());
    };
    init().then(() => setUserLoaded(true));
  }, [dispatch, history]);

  if (!isUserLoaded) {
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
}
