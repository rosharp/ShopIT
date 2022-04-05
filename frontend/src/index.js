import React from 'react';
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
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
>>>>>>> temp
);
