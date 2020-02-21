/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './ProfilePage.js';
import LoginPage from './LoginPage.js';
import NavBar from './NavBar.js';
import { ContentMargin, Center } from './Utils.js';

function App() {
  const styling = css`
  `;
  return (
    <div css={styling}>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <ContentMargin>
            <Center>
              {/* Render home */}
            </Center>
          </ContentMargin>
        </Route>
        <Route path='/profile'>
          <ContentMargin>
            <Center>
              <ProfilePage />
            </Center>
          </ContentMargin>
        </Route>
        <Route path='/login'>
          <ContentMargin>
            <Center>
              <LoginPage />
            </Center>
          </ContentMargin>
        </Route>
        <Route path='/'>
          <ContentMargin>
            <Center>
              {/* <Redirect to="/404" /> */}
              <p>404!!!</p>
            </Center>
          </ContentMargin>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
