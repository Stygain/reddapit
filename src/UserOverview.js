/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './PulseBubble.js';
import RedditComment from './RedditComment.js';
import RedditLink from './RedditLink.js';


function UserOverview(props) {
  const [ userOverviewData, setUserOverviewData ] = useState({data:{children:[]}});
  const [ loadingUser, setLoadingUser ] = useState(false);

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    ${'' /* border: 1px solid orange; */}

    .bubble-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `;
  useEffect(() => {
    async function fetchUserData() {
      let responseBody = {};
      setLoadingUser(true);
      const response = await fetch(
        `https://oauth.reddit.com/user/${props.username}/overview/?raw_json=1`,
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

      setUserOverviewData(responseBody)
      setLoadingUser(false)
    }
    fetchUserData()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);
  return (
    <div css={styling}>
      {loadingUser ? (
        <div className="bubble-container">
          <PulseBubble />
        </div>
      ) :
        <div>
          <div className="overview">
            {
              userOverviewData["data"]["children"].map((item) => {
                // console.log(item)
                if (item["kind"] === "t1") {
                  return(<RedditComment data={item} key={item.data.name} />);
                } else if (item["kind"] === "t3") {
                  return(<RedditLink data={item} key={item.data.name} />);
                }
              })
            }
          </div>
        </div>
      }
    </div>
  );
}


export default UserOverview;
