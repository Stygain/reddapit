import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppCookies from './App';
import { Global, css } from '@emotion/core';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import store from './redux/store.js';

const globalStyles = css`
  body {
    margin: 0;
    height: 100%;
  }
`;

ReactDOM.render(
  <div>
    <CookiesProvider>
      <Provider store={store}>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <AppCookies />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </div>, document.getElementById('root'));
