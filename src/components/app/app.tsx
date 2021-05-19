import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
import { IngredientModel } from '../../models/ingredient-model';
import { ingredientsApiUrl } from '../../utils/apiURLs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [state, setState] = useState<{
    isLoading: boolean;
    isErrorOccurred: boolean;
    ingredients: IngredientModel[];
  }>({ isLoading: false, isErrorOccurred: false, ingredients: [] });

  useEffect(() => {
    fetch(ingredientsApiUrl)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Произошла ошибка сети');
        }
        return resp.json()
      })
      .then((data) => {
          if (!data.success) {
            throw new Error('Ошибка получения данных');
          }
          setState( prevState => (
            { ...prevState, isLoading: false, ingredients: data.data }
          ))
      }
      )
      .catch((err) => {
        toast.error(err.message)
        setState(prevState => ({ ...prevState, isLoading: false, isErrorOccurred: true }));
      });
  }, []);


  return (
    //TODO: popup window on error

    <div className="App">
      <AppHeader />
      <MainPage ingredients={state.ingredients} />
      <ToastContainer />
    </div>
  );
}

export default App;
