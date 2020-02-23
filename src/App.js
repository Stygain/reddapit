/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useCookies, withCookies } from 'react-cookie';

import UserPage from './UserPage.js';
import LoginPage from './LoginPage.js';
import FrontPage from './FrontPage.js';
import NavBar from './NavBar.js';
import { ContentMargin, Center } from './Utils.js';

function App(props) {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const styling = css`
  `;
  return (
    <div css={styling}>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <ContentMargin>
            <Center>
              <FrontPage />
            </Center>
          </ContentMargin>
        </Route>
        <Route path='/user/:userAccount'>
          <ContentMargin>
            {/* <Center> */}
              <UserPage />
            {/* </Center> */}
          </ContentMargin>
        </Route>
        <Route path='/user'>
          <Redirect to={"/user/" + cookies.username} />
        </Route>
        <Route path='/login'>
          <Center>
            <LoginPage />
          </Center>
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

const AppCookies = withCookies(App);

export default AppCookies;
