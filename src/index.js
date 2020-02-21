import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/core';

import App from './App.js';
import store from './redux/store.js';

const globalStyles = css`
  body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <Global styles={globalStyles} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
