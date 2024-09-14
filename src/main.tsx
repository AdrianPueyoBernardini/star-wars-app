import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./style.css";
import { SwapiApp } from './SwapiApp';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SwapiApp/>
    </Provider>
  </StrictMode>,
);