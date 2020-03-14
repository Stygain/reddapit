/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useCookies, withCookies } from 'react-cookie';

import FrontPage from './FrontPage.js';
import SearchPage from './SearchPage.js';
import SubredditPage from './SubredditPage.js';
import UserPage from './UserPage.js';
import LoginPage from './LoginPage.js';
import NavBar from './NavBar.js';
import MySubreddits from './MySubreddits.js';
import PostPage from './PostPage.js';
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
            <UserPage />
          </ContentMargin>
        </Route>
        <Route path='/user'>
          <Redirect to={"/user/" + cookies.username} />
        </Route>
        <Route path='/r/:subreddit/:post'>
          <ContentMargin>
            <PostPage />
          </ContentMargin>
        </Route>
        <Route path='/r/:subreddit'>
          <ContentMargin>
            <SubredditPage />
          </ContentMargin>
        </Route>
        <Route path="/subreddits">
          <ContentMargin>
            <MySubreddits />
          </ContentMargin>
        </Route>
        <Route path='/r'>
          <Redirect to="/" />
        </Route>
        <Route path='/search/:query'>
          <ContentMargin>
            <Center>
              <SearchPage />
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
