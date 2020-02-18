import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Global, css } from '@emotion/core';
import { BrowserRouter } from 'react-router-dom';

const globalStyles = css`
  body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
`;

ReactDOM.render(
  <div>
    <Global styles={globalStyles} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>, document.getElementById('root'));
