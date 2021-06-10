import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/reducers';
import { useEffect, useState } from 'react';
import { getUser } from '../services/slices/auth';

export function OnlyUnauthRoute({ children, ...rest }: any) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await dispatch(getUser());
    };
    init().then(() => setUserLoaded(true));
  }, [dispatch]);

  if (!isUserLoaded) {
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
}
