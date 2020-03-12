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

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  a {
    color: rgb(37, 37, 37);
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  a:hover {
    color: rgb(0, 0, 0);
  }

  a.title {
    background: linear-gradient(to bottom, rgb(5, 135, 163) 0%, rgb(5, 135, 163) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
  }

  a.title:hover {
    background: linear-gradient(to bottom, rgb(0, 209, 255) 0%, rgb(0, 209, 255) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
  }

  a.user {
    background: linear-gradient(to bottom, rgb(181, 101, 27) 0%, rgb(181, 101, 27) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
  }

  a.user:hover {
    background: linear-gradient(to bottom, rgb(255, 124, 4) 0%, rgb(255, 124, 4) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
  }

  a.subreddit {
    background: linear-gradient(to bottom, rgb(75, 124, 69) 0%, rgb(75, 124, 69) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
  }

  a.subreddit:hover {
    background: linear-gradient(to bottom, rgb(72, 190, 58) 0%, rgb(72, 190, 58) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
  }

  a.comments {
    background: linear-gradient(to bottom, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
  }

  a.context {
    background: linear-gradient(to bottom, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 2px 2px;
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
