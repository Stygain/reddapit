/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './PulseBubble.js';


function UserHeader(props) {
  const [ userData, setUserData ] = useState({});
  const [ loadingUser, setLoadingUser ] = useState(false);

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    border: 1px solid blue;

  `;
  useEffect(() => {
    async function fetchUserData() {
      let responseBody = {};
      setLoadingUser(true);
      const response = await fetch(
        `https://oauth.reddit.com/api/v1/me?raw_json=1`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": ("bearer " + cookies.accessToken),
            "User-Agent": (cookies.redditApp + "/" + cookies.redditVersion + " by " + cookies.username)
          }
        }
      );
      responseBody = await response.json();
      console.log(responseBody);

      setUserData(responseBody)
      setLoadingUser(false)
    }
    fetchUserData()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);
  return (
    <div css={styling}>
      {loadingUser ? (
        <PulseBubble />
      ) :
        <div>
          <div className="username-karma">
            <h1>{userData["name"]}</h1>
            <h3>{userData["comment_karma"]} Comment Karma</h3>
            <h3>{userData["link_karma"]} Link Karma</h3>
          </div>
        </div>
      }
    </div>
  );
}


export default UserHeader;
