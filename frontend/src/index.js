import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
=======
import ReactDOM from 'react-dom';
=======
import * as ReactDOMClient from 'react-dom/client';
>>>>>>> tmp
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
<<<<<<< HEAD
  </React.StrictMode>,
  document.getElementById('root')
>>>>>>> temp
=======
  </Provider>
>>>>>>> tmp
);
