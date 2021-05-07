import React, { useEffect, useState } from 'react';
import AppHeader from './components/app-header/app-header';
import MainPage from './components/main-page/main-page';
import { IngredientModel } from './models/ingredient-model';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';


function App() {
  const [state, setState] = useState<{
    isLoading: boolean;
    isErrorOccurred: boolean;
    ingredients: IngredientModel[];
  }>({ isLoading: false, isErrorOccurred: false, ingredients: [] });

  useEffect(() => {
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then(
        (data) => setState( prevState => (
          { ...prevState, isLoading: false, ingredients: data.data }
          ))
      )
      .catch((err) => {
        console.error(err);
        setState(prevState => ({ ...prevState, isLoading: false, isErrorOccurred: true }));
      });
  }, []);


  return (
    //TODO: popup window on error

    <div className="App">
      <AppHeader />
      <MainPage ingredients={state.ingredients} />
    </div>
  );
}

export default App;
