import { useEffect, useState } from 'react';
import { getUser } from '../services/slices/auth';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/reducers';


export function ProtectedRoute({ children, ...rest }: any) {
  const user = useSelector( (state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await dispatch(getUser());
    };
    init().then(
      () => setUserLoaded(true)
    );
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      { ...rest }
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}