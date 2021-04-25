import React, { useEffect, useState } from 'react';
import AppHeader from './components/app-header/app-header';
import MainPage from './components/main-page/main-page';
import { IngredientModel } from './models/ingredient-model';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = useState<{
    isLoading: boolean;
    isErrorOccured: boolean;
    ingredients: IngredientModel[];
  }>({ isLoading: false, isErrorOccured: false, ingredients: [] });

  useEffect(() => {
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => setState({ ...state, isLoading: false, ingredients: data.data }))
      .catch((err) => {
        console.error(err);
        setState({ ...state, isLoading: false, isErrorOccured: true });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    //TODO: popup window on error

    <div className="App">
      <AppHeader />
      <MainPage ingredients={state.ingredients} />
    </div>
  );
}

export default App;
