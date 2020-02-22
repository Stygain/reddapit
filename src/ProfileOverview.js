/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jsx, css } from '@emotion/core';
import fetch from 'isomorphic-unfetch';

import PulseBubble from './PulseBubble.js';
import RedditComment from './RedditComment.js';
import RedditLink from './RedditLink.js';


function ProfileOverview(props) {
  const [ profileOverviewData, setProfileOverviewData ] = useState({data:{children:[]}});
  const [ loadingProfile, setLoadingProfile ] = useState(false);

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  const styling = css`
    border: 1px solid orange;

  `;
  useEffect(() => {
    async function fetchProfileData() {
      let responseBody = {};
      setLoadingProfile(true);
      const response = await fetch(
        `https://oauth.reddit.com/user/${cookies.username}/overview/?raw_json=1`,
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

      setProfileOverviewData(responseBody)
      // console.log(responseBody["data"]["children"])
      // console.log("PROFILE OVERVIEW DATA")
      // console.log(profileOverviewData);
      setLoadingProfile(false)
    }
    fetchProfileData()
  }, [cookies.accessToken, cookies.username, cookies.redditApp, cookies.redditVersion]);
  return (
    <div css={styling}>
      {loadingProfile ? (
        <PulseBubble />
      ) :
        <div>
          <div className="overview">
            {
              profileOverviewData["data"]["children"].map((item) => {
                console.log(item)
                if (item["kind"] === "t1") {
                  console.log("T1");
                  return(<RedditComment data={item} />);
                } else if (item["kind"] === "t3") {
                  console.log("T3");
                  return(<RedditLink data={item} />);
                }
              })
            }
          </div>
        </div>
      }
    </div>
  );
}


export default ProfileOverview;
