/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import {
  getAccessToken,
  getUsername,
  getRedditApp,
  getRedditVersion
} from './redux/selectors.js';
import PulseBubble from './PulseBubble.js';


function Trophy(props) {
  // const [ profileData, setProfileData ] = useState({});
  const [ trophyData, setTrophyData ] = useState({data:{trophies:[]}});
  // const [ loadingProfile, setLoadingProfile ] = useState(false);
  const [ loadingTrophies, setLoadingTrophies ] = useState(false);

  const accessToken = useSelector(getAccessToken);
  const username = useSelector(getUsername);
  const redditApp = useSelector(getRedditApp);
  const redditVersion = useSelector(getRedditVersion);

  const styling = css`
    border: 1px solid green;

  `;
  useEffect(() => {
    console.log("username: " + username)
    console.log("redditApp: " + redditApp)
    console.log("redditVersion: " + redditVersion)
    console.log("accessToken: " + accessToken)
    async function fetchTrophyData() {
      let responseBody = {};
      setLoadingTrophies(true);
      const response = await fetch(
        `https://oauth.reddit.com/api/v1/me/trophies`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": ("bearer " + accessToken),
            "User-Agent": (redditApp + "/" + redditVersion + " by " + username)
          }
        }
      );
      responseBody = await response.json();
      console.log(responseBody);

      setTrophyData(responseBody)
      setLoadingTrophies(false)
    }
    fetchTrophyData()
  }, [accessToken, username, redditApp, redditVersion]);
  return (
    <div css={styling}>
      {loadingTrophies ? (
        <PulseBubble />
      ) :
        <div>
          <div className="trophy">
            <h2>Trophies:</h2>
            {
              trophyData["data"]["trophies"].map((item) => {
                // console.log(item)
                return(<img src={item["data"]["icon_70"]} />)
              })
            }
          </div>
        </div>
      }
    </div>
  );
}


export default Trophy;
