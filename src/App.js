/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Switch, Route } from 'react-router-dom';
import { useCookies, withCookies } from 'react-cookie';

import ProfilePage from './ProfilePage.js';
import LoginPage from './LoginPage.js';
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
              {/* Render home */}
              <p>Should be the front page</p>
              {/* {setCookie('accessToken', "value")}
              {setCookie('username', "value")}
              {setCookie('appName', "value")}
              {setCookie('appVersion', "value")}
              {console.log(cookies)} */}
              {console.log(cookies)}
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
