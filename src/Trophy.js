/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './PulseBubble.js';


function Trophy(props) {
  // const [ profileData, setProfileData ] = useState({});
  const [ trophyData, setTrophyData ] = useState({data:{trophies:[]}});
  // const [ loadingProfile, setLoadingProfile ] = useState(false);
  const [ loadingTrophies, setLoadingTrophies ] = useState(false);
  const styling = css`
    border: 1px solid green;

  `;
  useEffect(() => {
    async function fetchTrophyData() {
      let responseBody = {};
      setLoadingTrophies(true);
      const response = await fetch(
        `https://oauth.reddit.com/api/v1/me/trophies`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": ("bearer " + ACCESS_TOKEN),
            "User-Agent": (APP_NAME + "/" + APP_VERSION + " by " + USERNAME)
          }
        }
      );
      responseBody = await response.json();
      console.log(responseBody);

      setTrophyData(responseBody)
      setLoadingTrophies(false)
    }
    fetchTrophyData()
  }, []);
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
