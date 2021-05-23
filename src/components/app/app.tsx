import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <MainPage />
      <ToastContainer />
    </div>
  );
}

export default App;
