// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContactProvider } from './context/ContactContext';
import { ModalProvider } from '../src/context/ModalContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <ContactProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContactProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
