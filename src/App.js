/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Switch, Route } from 'react-router-dom';

import NavBar from './NavBar.js';
import ProfilePage from './ProfilePage.js';


function ContentShift(props) {
  const styling = css`
    margin-top: 70px;
  `;
  return (
    <div css={styling}>
      {props.children}
    </div>
  );
}

function App() {
  const styling = css`
  `;
  return (
    <div css={styling}>
      <NavBar />
      <Switch>
        <Route exact path='/'>

        </Route>
        <Route exact path='/profile'>
          <ContentShift>
            <ProfilePage />
          </ContentShift>
        </Route>
        <Route exact path='/about'>
          {/* <About /> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
